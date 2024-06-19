
import  { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    try {
      const response = await fetch("https://krushibajarbackend.onrender.com/allproducts");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAllProducts(data.products); // Extract products array from the response
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch("https://krushibajarbackend.onrender.com/removeproduct", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
      });
      // Refresh the product list after removal
      await fetchInfo();
    } catch (error) {
      console.error("Error removing product:", error);
      // Optionally, display an error message to the user
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className='listproduct-allproducts'>
        <hr />

        {/* Ensure allProducts is an array before mapping */ }
        {Array.isArray(allProducts) && allProducts.map((product) => (
          <div key={product._id} className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt="" className='listproduct-product-icon' />
            <p>{product.name}</p>
            <p>₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;



/*import  { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  

  const fetchInfo = async () => {
   
       await fetch("http://localhost:4000/allproducts") 
       .then((res)=> res.json())
       .then((data)=>{ setAllProducts(data)});
    
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    
      await fetch("http://localhost:4000/removeproduct", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
      })
      // Refresh the product list after removal
      await fetchInfo();
    
    
  };


  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className='listproduct-allproducts'>
        <hr />

        {/* Ensure allProducts is an array before mapping 
        { Array.isArray(allProducts) &&allProducts.map((product,index) => {
          return <>

          <div key={index} className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt="" className='listproduct-product-icon' />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
          </div>
          <hr/>
          </>
        } )}
      </div>
    </div>
  );
};

export default ListProduct;
*/