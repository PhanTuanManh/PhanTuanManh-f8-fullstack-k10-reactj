import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { create, getOne, updateProduct } from "../../axios";

const ProductForm = () => {
  const nav = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const validateForm = () => {
    const newErrors = {};

    if (!product.title.trim()) {
      newErrors.title = "Tên sản phẩm không được để trống!";
    }

    if (!product.price || product.price <= 0) {
      newErrors.price = "Giá sản phẩm phải lớn hơn 0!";
    }

    if (!product.description.trim()) {
      newErrors.description = "Mô tả sản phẩm không được để trống!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await create("/products", product);
    if (window.confirm("Thêm sản phẩm thành công")) {
      nav("/admin/products");
    } else {
      setProduct({
        title: "",
        price: 0,
        description: "",
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    updateProduct("/products", id, product);
    if (window.confirm("Sửa sản phẩm thành công")) {
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

  useEffect(() => {
    if (id) {
      getOne("/products", id).then((data) => setProduct(data));
    }
  }, [id]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl py-2 mb-2">Thêm sản phẩm</h1>
      <form
        onSubmit={
          useLocation().pathname.includes("update")
            ? handleUpdate
            : handleSubmit
        }
        className="p-5 bg-white border"
      >
        <div className="form-group mb-2">
          <label htmlFor="title">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
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
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">Mô tả</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="form-group mb-2">
          <button type="submit" className="btn btn-primary">
            {useLocation().pathname.includes("update") ? "Sửa" : "Thêm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
