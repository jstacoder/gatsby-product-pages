import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import {
  Card,
  CardBody,
  CardFooter,
  CardImageHeader,
  CardHeader,
  CardText,
  CardTitle,
  Badge,
  ListGroup,
  ListGroupItem,
} from 'styled-bootstrap-components'

import Octicon, { Star } from 'react-octicon'

import Layout from '../../components/Layout'

import styles from './product.module.scss'

const ProductPage = ({ data: { productsYaml: product, file } }) => {
  console.log(file)
  const {
    childImageSharp: { fixed },
  } = file

  return (
    <Layout location={`/product/${product.id}`}>
      <Container>
        <Row>
          <Col lg={3} sm={3} md={3}>
            <h1>{product.name}</h1>
            <ListGroup>
              <h2>Related products</h2>
              {(product.name == 'coat' && (
                <Link to={`/products/bike`}>
                  <ListGroupItem action>Bike</ListGroupItem>
                </Link>
              )) || (
                <Link to={`/products/coat`}>
                  <ListGroupItem action>Coat</ListGroupItem>
                </Link>
              )}
            </ListGroup>
          </Col>
          <Col lg={9} sm={9} md={9} className={styles.cardTop}>
            <Card style={{ display: 'inline-block', width: '100%' }}>
              <Img style={{ width: '100%' }} fixed={fixed} />
              <CardBody>
                <Row>
                  <Col sm={2}>
                    <CardTitle>{product.name}</CardTitle>
                  </Col>
                  <Col sm={2}>
                    <CardText>${product.price}</CardText>
                  </Col>
                </Row>
                <CardText>{product.description}</CardText>
                <CardText>
                  <Octicon name={'star'} icon={Star} />
                  <Octicon name={'star'} icon={Star} />
                  <Octicon name={'star'} icon={Star} />
                  <Octicon name={'star'} icon={Star} />
                  <Octicon name={'star'} icon={Star} />
                </CardText>
                <Row>
                  <Col xs={12}>
                    <p>Categories: </p>
                    {product.categories.map(category => (
                      <Badge
                        style={{ marginLeft: 2, marginRight: 2 }}
                        action
                        dark
                      >
                        <Link
                          to={`/category/${category.name.replace(' ', '-')}`}
                        >
                          {category.name}
                        </Link>
                      </Badge>
                    ))}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default ProductPage

export const query = graphql`
  query queryProduct($id: String, $image: String) {
    productsYaml(id: { eq: $id }) {
      name
      price
      title
      description
      images
      categories {
        name
      }
    }
    file(base: { eq: $image }) {
      childImageSharp {
        fixed: fixed(height: 280, quality: 100) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
  }
`
