import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

import {
  useDeleteProductMutationQuery,
  useGetAProductQuery,
  useGetAllProductsQuery,
  useUpdateProductMutationQuery,
} from "../api/index";

import "bootstrap/dist/css/bootstrap.css";

export function AProduct() {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    Error,
  } = useGetAProductQuery();
  // const [deleteProduct] = useDeleteProductMutationQuery();
  const [productList, setProductList] = useState([]);

  let myData;
  useEffect(() => {
    setProductList(products);
  }, []);

  const handleEditClick = (id) => {
    console.log(id);
  };

  const handleDeleteClick = (id) => {
    console.log("kk");
  };

  if (isLoading) {
    console.log("loadmimg");
    myData = <h>Loading Products ....</h>;
  }
  if (isSuccess) {
    let list = products.products;
    console.log("p", products.products);
    myData = <h1>A product</h1>;
  }
  if (isError) {
    myData = <p>{Error}</p>;
  }

  return (
    <center>
      <div style={{ display: "block", width: 700, padding: 30 }}>
        <h4>A Product</h4>
        <br />
        {myData}
      </div>
    </center>
  );
}
