import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { create, getOne, updateProduct } from "../../axios";

const ProductForm = () => {
  const nav = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    console.log(product);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create("/products", product);
    if (window.confirm("Them thanh cong")) {
      nav("/admin/products");
    } else {
      setProduct({
        title: "",
        price: 0,
        description: "",
      });
    }
  };

  const location = useLocation();
  const id = useParams().id;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProduct("/products", id, product);
    if (window.confirm("Sua thanh cong")) {
      nav("/admin/products");
    } else {
      setProduct({
        title: "",
        price: 0,
        description: "",
      });
    }
  };

  useEffect(() => {
    if (id) {
      getOne("/products", id).then((data) => setProduct(data));
    }
  }, [id]);

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   updateProduct("/products", id, product);
  //   if (window.confirm("Sua thanh cong")) {
  //     nav("/admin/products");
  //   } else {
  //     setProduct({
  //       title: "",
  //       price: 0,
  //       description: "",
  //     });
  //   }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl py-2 mb-2">Thêm sản phẩm</h1>
      <form action="" className="p-5 bg-white border">
        <div className="form-group mb-2">
          <label htmlFor="title">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price">Giá sản phẩm</label>
          <input
            className="form-control"
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-2">
          {useLocation().pathname.includes("update") ? (
            <button className="btn btn-primary" onClick={handleUpdate}>
              Sua
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Them
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
