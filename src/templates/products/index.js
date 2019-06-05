import React from 'react'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

export default props => {
  console.log(props.data)
  console.log(props.pageContext.images.map(image => image[0]))

  const images = {}
  props.data.allFile.nodes.forEach(image => {
    images[image.base] = image.childImageSharp.fixed
  })
  console.log(images)
  return (
    <Layout location={'/products'}>
      {props.pageContext.products.map(product => (
        <div className="col-lg-4 col-md-6 mb-4" key={product.name}>
          <div className="card h-100">
            <a href="#">
              <Img
                className="card-img-top"
                fixed={images[product.images[0]]}
                alt=""
              />
            </a>
            <div className="card-body">
              <h4 className="card-title">
                <a href="#">{product.name}</a>
              </h4>
              <h5>${product.price}</h5>
              <p className="card-text">{product.description}</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">
                &#9733; &#9733; &#9733; &#9733; &#9734;
              </small>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query getImages($images: [String]) {
    allFile(filter: { base: { in: $images } }) {
      nodes {
        parent {
          id
        }
        base
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }
  }
`
