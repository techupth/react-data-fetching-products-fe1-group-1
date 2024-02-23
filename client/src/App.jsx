import "./App.css";
import { useEffect,useState } from "react";
import axios from "axios"

function App() {
  const [products,setProducts]=useState([])

  useEffect(()=>{
    getProductprofile();
  },[])

  const getProductprofile= async () => {
    try{
      const response=await axios.get(
      "http://localhost:4001/products"
    )
    console.log("Response data:", response.data);
    if (Array.isArray(response)) {
      setProducts(response.data.data);
    } else if (response.data && typeof response.data === 'object') {
      setProducts([response.data.data]);
    } else {
      console.error("Unexpected response format:", response.data);
    }
    }
    catch (error) {
      console.error("Error fetching products:", error);
      setError(error.toString());
    }
  };
  console.log(products)
  
  async function deleteProduct(id) {
    console.log(id)
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      getProductprofile(); // Refresh the product list after deletion
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      setError(error.toString());
    }
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products[0].map((item)=>{
            return(
              <div className="product">
                <div className="product-preview" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {item.name}</h1>
                  <h2>Product price: {item.price} Baht</h2>
                  <p>Product description: {item.description}</p>
                </div>

                <button className="delete-button" onClick={() => deleteProduct(item.id)}>x</button>
              </div>
            )
        })}
      </div>
    </div>
  );
}

export default App;
