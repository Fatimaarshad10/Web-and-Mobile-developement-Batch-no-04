import { useState, useEffect } from "react";

function Product1() {
  const data = [
    { id: 1, title: "Product no 01" },
    { id: 2, title: "Product no 02" },
    { id: 3, title: "Product no 03" },
  ];

  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(data);
  }, []);

  const deleteProduct = (id) => {
    setProduct(product.filter((item) => item.id !== id));

  };
    console.log(product)


  return (
    <div>
      {product.map((item , key) => (
        <div key={key}>
          <h3>{item.title}</h3>
          <button onClick={() => deleteProduct(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Product1;