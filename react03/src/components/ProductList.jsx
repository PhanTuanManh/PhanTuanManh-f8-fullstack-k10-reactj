import React from "react";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-md">
          <div className="w-full mb-4 rounded">
            <img
              src={product.images[0] || "https://placehold.co/600x600"}
              alt={product.name}
              className="w-full aspect-square object-cover rounded"
            />
          </div>
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <h2>{product.price}$</h2>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
