import React, { useEffect, useState } from 'react';

const products = [
  { id: 1, name: "Limbo" },
  { id: 2, name: "Doom" },
  { id: 3, name: "Subnautica" }
];

const api = {
  getProducts: () => { return Promise.resolve(products);},
  getProduct: (id) => { return Promise.resolve(
    products.find(p => p.id === id));
  }
}

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [selected, setSelected] = useState(2);

  async function fetchData() {
    const products = await api.getProducts();
    setProducts(products);
  }

  async function fetchProduct(productId) {
    const p = await api.getProduct(productId);
    setProduct(p.name);
  }

  useEffect(() => {
    console.log('use effect');
    fetchData();
    fetchProduct(selected);
  }, [selected]);

  return (
    <>
      <h1>Async shop</h1>
      <h2>Products</h2>
      {products.map(p => <div>{p.name}</div>)}
     <h3>Selected product</h3> {product}
     <button onClick={() => setSelected(1)}>Change selected</button>
    </>
  );
}

export default ProductList;