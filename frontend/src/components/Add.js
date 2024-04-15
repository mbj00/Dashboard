import React, { useState } from 'react'

export default function Add() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);

  const addProduct = async ()=>{
    // console.log(name,price,category,company)

    if(!name || !price || !category || !company){
      setError(true);
      console.log("enter")
      return false;
    }

    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log(userId._id);

    let result = await fetch("http://localhost:5000/add", {
      method: "post",
      body: JSON.stringify({name, price, category, company, userId}),
      headers: {
        "content-Type" : "application/json",
        authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    result = await result.json();
    console.log(result);
    alert("Product has been added Successfully")
    
  }

  return (
    <div className='signup'>
      <h2><b>Add Product</b></h2>
      <div className='form'>
        <br />
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="" id="" placeholder='Enter Name' />
        {error && !name && <p className='val_data'>*Enter valid Name</p>}
        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="" id="" placeholder='Enter Price' />
        {error && !price && <p className='val_data'>*Enter valid Price</p>}
        <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" name="" id="" placeholder='Enter Category' />
        {error && !category && <p className='val_data'>*Enter valid Category</p>}
        <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" name="" id="" placeholder='Enter Company' />
        {error && !company && <p className='val_data'>*Enter valid Company</p>}
        <span onClick={addProduct}>Add Product</span>
      </div>
    </div>
  )
}
