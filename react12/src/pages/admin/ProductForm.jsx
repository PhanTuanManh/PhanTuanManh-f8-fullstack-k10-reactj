import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Spin, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  editProduct,
  fetchProductById,
} from "../../features/products/productActions";

const { TextArea } = Input;

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { products } = useSelector((state) => state.products);
  console.log(products);
  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(fetchProductById(id)).then((product) => {
        if (product) {
          form.setFieldsValue({
            title: product.title,
            price: product.price,
            description: product.description,
          });
        }
        setLoading(false);
      });
    }
  }, [id, dispatch, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (id) {
        await dispatch(editProduct({ id, product: values }));
        notification.success({ message: "Sửa thành công" });
      } else {
        await dispatch(createProduct(values));
        notification.success({ message: "Thêm thành công" });
      }
      navigate("/");
    } catch (error) {
      notification.error({ message: "Thất bại" });
    } finally {
      setLoading(false);
    }
  };

  const validatePrice = (_, value) => {
    if (!value || value <= 0) {
      return Promise.reject(new Error("Số dương"));
    }
    return Promise.resolve();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>{id ? "Update Product" : "Add Product"}</h2>
      <Form
        form={form}
        name="productForm"
        onFinish={onFinish}
        initialValues={{ title: "", price: "", description: "" }}
        layout="vertical"
        style={{ width: "80%" }}
      >
        <Form.Item
          name="title"
          label="Product Title"
          rules={[
            { required: true, message: "Bắt buộc" },
            { min: 6, message: "Tieu de can toi thieu 6 ky tu" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Bắt buộc" },
            { validator: validatePrice },
          ]}
        >
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              optional: true,
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {id ? "Update Product" : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
