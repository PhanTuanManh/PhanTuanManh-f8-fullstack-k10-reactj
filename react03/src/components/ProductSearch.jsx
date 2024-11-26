import React from "react";

const ProductSearch = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Tìm kiếm sản phẩm..."
        className="w-full px-4 py-2 border rounded-md"
      />
    </div>
  );
};

export default ProductSearch;
