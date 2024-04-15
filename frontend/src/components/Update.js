import React, { useEffect, useState } from 'react'
import { useParams, useNavigation } from 'react-router-dom';


export default function Update() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const params = useParams();

  // const navigate = useNavigation();

  useEffect(() => {
    console.log(params)
    getDetails();
  }, [])

  const getDetails = async () => {
    let result = await fetch('http://localhost:5000/product/' + params.id, {
      method: "get",
      headers:{
        authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }


  const updateProduct = async () => {

    let result = await fetch('http://localhost:5000/produt/' + params.id, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    result = await result.json();
    console.log(result);

    
    // navigate('/');

    console.log(name, price, category, company)
  }

  return (
    <div className='signup'>
      <h2><b>Update Product</b></h2>
      <div className='form'>
        <br />
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="" id="" placeholder='Enter Name' />

        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="" id="" placeholder='Enter Price' />

        <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" name="" id="" placeholder='Enter Category' />

        <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" name="" id="" placeholder='Enter Company' />

        <span onClick={updateProduct}>Update Product</span>
      </div>
    </div>
  )
}
