import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  removeProduct,
} from "../../features/products/productActions";
import { Link } from "react-router-dom";
import {
  Spin,
  Button,
  Table,
  Space,
  Popconfirm,
  Typography,
  notification,
} from "antd";

const { Title } = Typography;

const ProductTable = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
    notification.success({ message: "Xóa thanh cong" });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/update/${record.id}`}>
            <Button type="link">Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        Product List
      </Title>
      <Link to="/add">
        <Button type="primary" style={{ marginBottom: 16 }}>
          Add Product
        </Button>
      </Link>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default ProductTable;
