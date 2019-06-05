import React from 'react'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import {
  Container,
  Row,
  Column as Col,
  Jumbotron,
  Button,
} from 'styled-bootstrap-components'

export default props => {
  return (
    <Layout location={`/category/${props.pageContext.category}`}>
      <Container>
        <Row>
          <Col textCentered xs={12}>
            <Jumbotron>
              <h2>{props.pageContext.category}</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button dark border link>
              <Link to={`/product/${props.pageContext.product.name}`}>
                {props.pageContext.product.name}
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
