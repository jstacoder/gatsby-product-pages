const each = require('lodash/each')
const Promise = require('bluebird')
const path = require('path')
const PostTemplate = path.resolve('./src/templates/index.js')




exports.sourceNodes = ({actions}) =>{
  const { createNode } = actions
}

exports.setFieldsOnGraphQLNodeType = ({graphql, type, ...rest}, ...restList) =>{
  console.log(graphql)
  console.log('rest',  rest)
  console.log('restlist',restList)
  
  if(type.name === 'ProductsYaml'){
    return {
      name: type.name,
      fields: {
        categories: {
          type: graphql.ListType
        }
      }
    }
  }
}

exports.onCreateNode = ({
  createNodeId, createContentDigest, actions, node, getNode}) =>{
  console.log(node.internal.type)
  const { createNode } = actions
  const cats = new Set()
  
  if(node.internal.type==='ProductsYaml'){
    console.log(node)
    const { categories } = node
    categories.forEach(category =>{
      const categoryId = createNodeId(category)
      const categoryMeta = {
        id: categoryId,
        parent: node.id,
        children: [],
        name: category,
        internal: {
          type: 'ProductCategory',
          content: category,
          contentDigest: createContentDigest(category)
        }
      }
      createNode(categoryMeta)
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
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

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}
