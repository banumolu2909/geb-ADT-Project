// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'


// const Add = () => {
//   const [order,setOrder] = useState({
//     title:"",
//     desc:"",
//     price:null,
//     cover:"",
//   })

//   const navigate = useNavigate()

//   const handleChange = (e) =>{
//     setOrder((prev)=>({...prev, [e.target.name]: e.target.value}))
//   }
//   const handleClick = async e=>{
//     e.preventDefault();
//     console.log("hello");
//     try{
//       console.log("in try");
//       await axios.post("http://localhost:8800/orders", order);
//       navigate("/");
//     }catch(err){
//       console.log(err)
//       alert("Error adding order. Please try again.")
//     }

//   }

//   console.log(order)
//   return (
//     <div className='form'>
//       <h1>Add New Order</h1>
//       <input type="text" placeholder="title" onChange={handleChange} name="title"/>
//       <input type="text" placeholder="desc" onChange={handleChange} name="desc"/>
//       <input type="number" placeholder="price" onChange={handleChange} name="price"/>
//       <input type="text" placeholder="cover" onChange={handleChange} name="cover"/>
//       <button onClick={handleClick} >Add</button>
//     </div>
//   )
// }

// export default Add



import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Add = () => {
  const [order,setOrder] = useState({
    // order_id: "",
    order_date: "",
    // product_id: "",
    // customer_id: "",
    order_status: "",
    shipping_date: "",
    shipping_class: "",
    product_name: "",
    category: "",
    sub_category: "",
    customer_name: "",
    city: "",
    state: "",
    country: "",
    zip_code: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setOrder((prev)=>({...prev, [e.target.name]: e.target.value}))
  }

//   const handleClick = async e=>{
//     e.preventDefault();
//     //console.log("hello");
//     try{
//       //console.log("in try");
//       await axios.get("http://localhost:8800/createOrders", order);
//       await axios.post("http://localhost:8800/createOrders", order);
//       navigate("/");
//     }catch(err){
//       console.log(err)
//       alert("Error adding order. Please try again.")
//     }
//   }


  const handleClick = async e=>{
    e.preventDefault();
    //console.log("hello");
    try {
        console.log(order.product_name);
        const response = await axios.get("http://localhost:8800/createOrders", order);
        console.log(response.data)
        console.log("outtt")
        const orderData = response.data; // Store the returned data in a variable
        // const productName= order.product_name;
        // const productCategory= order.category;
        // const subCategory=order.sub_category;
        // const response2 = await axios.get(`http://localhost:8800/createOrders2/${productName}/${productCategory}/${subCategory}`, { data: order});

        // const response2 = await axios.get(`http://localhost:8800/createOrders2/${productName}/${productCategory}/${subCategory}`, order);
        // console.log(response2.data)
        // console.log("outtt2")
        // const productId = response2.data; // Store the returned data in a variable
        const response2 = await axios.post("http://localhost:8800/createOrders2", order);
        const productId = response2.data;
        console.log(productId);

        const response3 = await axios.post("http://localhost:8800/createOrders3", order);
        const customerId = response3.data;
        console.log(customerId);
        // await axios.post(`http://localhost:8800/createOrders/${orderData}/${productId}`, order); // Use the variable as the payload for the POST request
        await axios.post(`http://localhost:8800/createOrders/${orderData}/${productId}/${customerId}`, order);
        navigate("/");
      } catch (error) {
        console.log(error);
        alert("Error adding order. Please try again.")
      }
  }





//   const handleClick = async e=>{
//     e.preventDefault();
//     //console.log("hello");
//     try{
//       //console.log("in try");
//       await axios.get("http://localhost:8800/createOrders", order);
//       await axios.post("http://localhost:8800/createOrders", order);
//       navigate("/");
//     }catch(err){
//       console.log(err)
//       alert("Error adding order. Please try again.")
//     }

//   }

  //console.log(order)
  return (
    <div className='form'>
      <h1>Add New Order</h1>
      {/* <input type="text" placeholder="order_id" onChange={handleChange} name="order_id"/> */}
      <input type="text" placeholder="order_date" onChange={handleChange} name="order_date"/>
      {/* <input type="text" placeholder="product_id" onChange={handleChange} name="product_id"/>
      <input type="text" placeholder="customer_id" onChange={handleChange} name="customer_id"/> */}
      <input type="text" placeholder="order_status" onChange={handleChange} name="order_status"/>
      <input type="text" placeholder="shipping_date" onChange={handleChange} name="shipping_date"/>
      <input type="text" placeholder="shipping_class" onChange={handleChange} name="shipping_class"/>
      <input type="text" placeholder="product_name" onChange={handleChange} name="product_name"/>
      <input type="text" placeholder="category" onChange={handleChange} name="category"/>
      <input type="text" placeholder="sub_category" onChange={handleChange} name="sub_category"/>
      <input type="text" placeholder="customer_name" onChange={handleChange} name="customer_name"/>
      <input type="text" placeholder="city" onChange={handleChange} name="city"/>
      <input type="text" placeholder="state" onChange={handleChange} name="state"/>
      <input type="text" placeholder="country" onChange={handleChange} name="country"/>
      <input type="text" placeholder="zip_code" onChange={handleChange} name="zip_code"/>
      <button onClick={handleClick} >Add</button>
    </div>
  )
}

export default Add
