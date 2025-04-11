import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div
      className="product-detail"
      style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
    >
      <div
        className="product-image"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ maxWidth: "300px", height: "auto" }}
        />
      </div>
      <div className="product-info">
        <h1 style={{ marginBottom: "10px" }}>{product.title}</h1>
        <p
          className="product-description"
          style={{ marginBottom: "10px", color: "#555" }}
        >
          {product.description}
        </p>
        <p
          className="product-price"
          style={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          ${product.price}
        </p>
        <button
          onClick={handleAddToCart}
          className="add-to-cart-btn"
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: added ? "2px solid blue" : "2px solid transparent",
            backgroundColor: added ? "white" : "#007bff",
            color: added ? "blue" : "white",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
