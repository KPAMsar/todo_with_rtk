import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";

import {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

} from "../api/index";

import "bootstrap/dist/css/bootstrap.css";

export function AllProducts() {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    Error,
  } = useGetAllProductsQuery();

  // const [deleteProduct] = useDeleteProductMutationQuery();
 const [productList, setProductList] = useState([]),
  [showProduct, setShowProduct] = useState(false),
  [showDelete, setShowDelete] = useState(false),
  [selectedProduct, setShowSelectedProduct] = useState([]),
  [showEdit, setShowEdit] = useState(false),
  [brandName, setBrandName] = useState(''),
  [category, setCategory] = useState(''),
  [price, setPrice] = useState(''),
  [discount, setDiscount] = useState(''),
  [rating, setRating] = useState(""),
  [instock, setInstock] = useState(''),
  [description, setDescription] = useState(''),
  [itemId, setItemId]= useState('');
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const[showAddProduct,setShowAddProduct] = useState(true);

  


  
  const handleSubmit = async(e) =>{
   e.preventDefault();
   if(brandName == undefined){
    alert('Brand name is required');
    return false;
   }
   if(category == undefined){
    alert('Category is needed');
    return false;
   }
   if(price == undefined){
    alert('Product price is needed')
    return false;
   }
   if(discount == undefined){
    alert('Product discount is needed')
    return false;
   }
  if (rating == undefined) {
      alert("Product rating is needed");
      return false;
  }
   if (instock == undefined) {
     alert("Product instock quantity is needed");
     return false;
   }
    if (description == undefined) {
      alert("Product description is needed");
      return false;
    }

    const mySubmitButtn = document.getElementById("update-btn");
    mySubmitButtn.setAttribute("disabled",true)
    const info = await updateProduct({
      id: itemId,
      brand: brandName,
      description,
      price,
      discountPercentage: discount,
      rating,
      stock: instock,
      category,
    });
      console.log(info);
      mySubmitButtn.removeAttribute('disabled',true)
  }

    const handleAddNewProduct = async (e) => {
      e.preventDefault();
      if (brandName == undefined) {
        alert("Brand name is required");
        return false;
      }
      if (category == undefined) {
        alert("Category is needed");
        return false;
      }
      if (price == undefined) {
        alert("Product price is needed");
        return false;
      }
      if (discount == undefined) {
        alert("Product discount is needed");
        return false;
      }
      if (rating == undefined) {
        alert("Product rating is needed");
        return false;
      }
      if (instock == undefined) {
        alert("Product instock quantity is needed");
        return false;
      }
      if (description == undefined) {
        alert("Product description is needed");
        return false;
      }

      const mySubmitButtn = document.getElementById("add-new-btn");
      mySubmitButtn.setAttribute("disabled", true);
      const info = await addProduct({
        id: itemId,
        brand: brandName,
        description,
        price,
        discountPercentage: discount,
        rating,
        stock: instock,
        category,
      });
      console.log(info);
      mySubmitButtn.removeAttribute("disabled", true);
    };
  let myData;
    useEffect(() => {
      setProductList(products);
    },[]);


// const handleEditClick = (id)=>{
//   console.log(id);


// }


const handleDeleteProduct = async() =>{
  
  console.log("id", selectedProduct.id);
  const info = await deleteProduct({ id: selectedProduct.id });
  
setShowDelete(false);
  if (info.data.isDeleted == true){
    alert('Item deleted succesfully')
  }
  else{
    alert('something went wrong')
  }
   console.log("info", info.data.isDeleted);
}

const handleViewClick = () =>{
  setShowProduct(true)
  

}


  if (isLoading) {
    console.log("loadmimg");
    myData = <h>Loading Products ....</h>;
  }
  if (isSuccess) {
   let list = products.products;
    myData = list.map((item) =>{
      return (
        // <card>
        //   {item.id}
        //   {item.title }
        //   <br />
        //   <br />
        // </card>
        <Card style={{ width: "45rem", margin: "10px" }} key={item.id}>
          <Card.Img variant="top" src={item.thumbnail} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Row>
              <Col>
                <Button
                  variant="primary"
                  name=" dd"
                  id={item.id}
                  onClick={() => {
                    setShowSelectedProduct(item);
                    setShowEdit(true);
                    setItemId(item.id);
                  }}
                >
                  Edit
                </Button>
              </Col>
              <Col>
                <Button
                  variant="success"
                  onClick={() => {
                    setShowSelectedProduct(item);
                    setShowProduct(true);
                  }}
                >
                  View
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShowSelectedProduct(item);
                    setShowDelete(true);
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    });
  
  }
  if (isError) {
    myData = <p>{Error}</p>;
  }




  return (
    <>
      <center>
        <div style={{ display: "block", width: 700, padding: 30 }}>
          <Row>
            <Col>
              <h4>Get Product</h4>
            </Col>
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAddProduct(true);
                }}
              >
                Add Product
              </Button>
            </Col>
          </Row>

          <br />
          {myData}
        </div>
      </center>

      <Modal show={showProduct}>
        <Modal.Header
          closeButton
          onClick={() => {
            setShowProduct(false);
          }}
        >
          <Modal.Title>Product details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            // style={{ width: "45rem", margin: "10px" }}
            key={selectedProduct.id}
          >
            <Card.Img
              variant="top"
              src={selectedProduct.thumbnail}
              style={{ width: "auto", margin: "1px" }}
            />
            <Card.Body>
              <Card.Title>{selectedProduct.title}</Card.Title>
              <Row>
                <Col>
                  <Card.Text>Brand:{selectedProduct.brand}</Card.Text>
                </Col>
                <Col>
                  <Card.Text> Category: {selectedProduct.category}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    {" "}
                    Discount: {selectedProduct.discountPercentage}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>Price: {selectedProduct.price}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>Rating: {selectedProduct.rating}</Card.Text>
                </Col>
                <Col>
                  <Card.Text> No. in stock: {selectedProduct.stock}</Card.Text>
                </Col>
              </Row>

              {/* <Card.Text>{selectedProduct}</Card.Text> */}
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setShowProduct(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete}>
        <Modal.Header
          closeButton
          onClick={() => {
            setShowDelete(false);
          }}
        >
          <Modal.Title>React Modal Popover Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete product ??</p>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDelete(false);
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={handleDeleteProduct}>
                Delete
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit}>
        <Modal.Header
          closeButton
          onClick={() => {
            setShowEdit(false);
          }}
        >
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Brand </Form.Label>
              <Form.Control
                type="text"
                name="brand"
                id="brand"
                value={brandName}
                placeholder="Enter Brand Name"
                onChange={(e) => setBrandName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                name="category"
              />
            </Form.Group>{" "}
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>{" "}
              </Col>{" "}
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Discount Rate</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    value={discount}
                    placeholder="Enter discount"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </Form.Group>{" "}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter rating"
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </Form.Group>{" "}
              </Col>{" "}
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>In stock</Form.Label>
                  <Form.Control
                    type="number"
                    value={instock}
                    placeholder="Enter quantity in stock"
                    name="quantity"
                    onChange={(e) => setInstock(e.target.value)}
                  />
                </Form.Group>{" "}
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" placeholder="Enter email" />
            </Form.Group>{" "}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowEdit(false);
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button variant="success" id="update-btn" onClick={handleSubmit}>
                Update
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddProduct}>
        <Modal.Header
          closeButton
          onClick={() => {
            setShowAddProduct(false);
          }}
        >
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Brand </Form.Label>
              <Form.Control
                type="text"
                name="brand"
                id="brand"
                value={brandName}
                placeholder="Enter Brand Name"
                onChange={(e) => setBrandName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                name="category"
              />
            </Form.Group>{" "}
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>{" "}
              </Col>{" "}
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Discount Rate</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    value={discount}
                    placeholder="Enter discount"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </Form.Group>{" "}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter rating"
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </Form.Group>{" "}
              </Col>{" "}
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>In stock</Form.Label>
                  <Form.Control
                    type="number"
                    value={instock}
                    placeholder="Enter quantity in stock"
                    name="quantity"
                    onChange={(e) => setInstock(e.target.value)}
                  />
                </Form.Group>{" "}
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" placeholder="Enter email" />
            </Form.Group>{" "}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowEdit(false);
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button variant="success" id="add-new-btn" onClick={handleAddNewProduct}>
                Save
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}




