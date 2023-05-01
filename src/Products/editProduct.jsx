import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export default function Products() {
  return (
    <center>
      <div style={{ display: "block", width: 700, padding: 30 }}>
        <h4>Update Product</h4>
        <Form>
          <Form.Group>
            <Form.Label style={{ float: "left", marginTop: "10px" }}>
              Product Name:
            </Form.Label>

            <Form.Control type="text" name="name" placeholder="Product Name" />
          </Form.Group>

          <Form.Group>
            <Form.Label style={{ float: "left", marginTop: "10px" }}>
              Product description:
            </Form.Label>

            <Form.Control
              type="text"
              name="description"
              placeholder="Product Descriptionx"
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label style={{ float: "left", marginTop: "10px" }}>
                  Product Price:
                </Form.Label>

                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Product Price"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label style={{ float: "left", marginTop: "10px" }}>
                  Product Discount:
                </Form.Label>

                <Form.Control
                  type="text"
                  name="discount"
                  placeholder="Product Discount"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label style={{ float: "left", marginTop: "10px" }}>
              Product Image:
            </Form.Label>
            <Form.Control
              type="text"
              name="image"
              placeholder="Product Image"
            />
          </Form.Group>
          <div style={{ marginTop: "20px" }}>
            <Button variant="primary" type="submit">
              Click here to Update
            </Button>
          </div>
        </Form>
      </div>
    </center>
  );
}
