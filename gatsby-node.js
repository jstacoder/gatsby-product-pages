const each = require('lodash/each')
const Promise = require('bluebird')
const path = require('path')
const PostTemplate = path.resolve('./src/templates/index.js')

exports.sourceNodes = ({ actions, schema }) => {
  const { createNode, createTypes } = actions

  const typeDefs = `
    type ProductsYaml implements Node {
      categories: [ProductCategory]!
    }
  `
  createTypes(typeDefs)

  createTypes([
    schema.buildObjectType({
      name: `ProductsYaml`,
      fields: {
        categories: {
          type: '[ProductCategory]!',
          resolve: (source, args, context, info) => {
            const categories = source[info.fieldName]
            return (
              categories && categories.map(category => ({ name: category }))
            )
          },
        },
      },
    }),
  ])
}

exports.onCreateNode = ({
  createNodeId,
  createContentDigest,
  actions,
  node,
  getNode,
}) => {
  console.log(node.internal.type)
  const { createNode } = actions
  const cats = new Set()

  if (node.internal.type === 'ProductsYaml') {
    console.log(node)
    const { categories } = node
    categories.forEach(category => {
      const categoryId = createNodeId(category)
      const categoryMeta = {
        id: categoryId,
        parent: node.id,
        children: [],
        name: category,
        internal: {
          type: 'ProductCategory',
          content: category,
          contentDigest: createContentDigest(category),
        },
      }
      createNode(categoryMeta)
    })
  }
}

exports.createPages = ({ graphql, actions }, pluginOptions) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    // language=GraphQL
    resolve(
      graphql(
        `
          {
            allProductsYaml {
              products: nodes {
                id
                name
                images
              }
            }
            images: allFile {
              nodes {
                base
                childImageSharp {
                  fixed(width: 400) {
                    src
                    originalName
                  }
                }
              }
            }
            allProductCategory {
              categories: nodes {
                name
                product: parent {
                  ... on ProductsYaml {
                    id
                    name
                  }
                }
              }
            }
            allFile(filter: { extension: { regex: "/md|js/" } }, limit: 1000) {
              edges {
                node {
                  id
                  name: sourceInstanceName
                  path: absolutePath
                  remark: childMarkdownRemark {
                    id
                    frontmatter {
                      layout
                      path
                    }
                  }
                }
              }
            }
          }
        `
      ).then(({ errors, data }) => {
        if (errors) {
          console.log(errors)
          reject(errors)
        }
        const {
          allProductCategory: { categories },
        } = data
        console.log(categories)
        categories.forEach(category => {
          createPage({
            path: `/category/${category.name.replace(' ', '-')}`,
            component: path.resolve(`./src/templates/Category/index.js`),
            context: {
              category: category.name,
              product: category.product,
            },
          })
        })
        // create product pages
        const products = data.allProductsYaml.products
        createPage({
          path: '/products',
          component: path.resolve('./src/templates/products/index.js'),
          context: {
            products,
            images: products.map(
              product => product.images && product.images[0]
            ),
          },
        })
        products.forEach(product => {
          console.log(product, product.images)
          createPage({
            path: `/products/${product.name}`,
            component: path.resolve('./src/templates/Product/index.js'),
            context: {
              id: product.id,
              image: (product.images && product.images[0]) || null,
            },
          })
        })
        // Create blog posts & pages.
        const items = data.allFile.edges
        const posts = items.filter(({ node }) => /posts/.test(node.name))
        each(posts, ({ node }) => {
          if (!node.remark) return
          const { path } = node.remark.frontmatter
          createPage({
            path,
            component: PostTemplate,
          })
        })

        const pages = items.filter(({ node }) => /page/.test(node.name))
        each(pages, ({ node }) => {
          if (!node.remark) return
          const { name } = path.parse(node.path)
          const PageTemplate = path.resolve(node.path)
          createPage({
            path: name,
            component: PageTemplate,
          })
        })
      })
    )
  })
}
exports.onCreateWebpackConfig = ({ actions, ...rest }) => {
  // console.log(rest)
  actions.setWebpackConfig({
    // ...getWebpackConfig(),
    // output: {
    //   path: 'D:\\\\git\\\\gatsby-product-pages\\\\docs'
    // },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}
