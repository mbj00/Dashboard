import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState('');

    useEffect(() => {
        getProducts();


    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products",{
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        result = await result.json();
        setProducts(result);
        console.log(result);
    }

    const deleteProduct = async (id) => {
        console.log(id);

        let result = await fetch('http://localhost:5000/product/' + id, {
            method: "delete",
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        result = Array.from(result);

        if (result) {
            alert("Record has been deleted");
            getProducts();
        }
    }

    const search = async (e) => {
        console.log(e.target.value);

        let key = e.target.value;

        if(key){
            let result = await fetch("http://localhost:5000/search/"+key, {
                method : "get",
                headers:{
                    authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            console.log(result);
            if(result){
                setProducts(result);
            }
        }else{
            getProducts();
        }

        
    }
    return (
        <div className='product_list'>
            <h1><b>Product List</b></h1>
            <input onChange={search} className='search' type="text" name="search" id="" placeholder='Search here..' />
            <ul >
                <li><b>S. No.</b></li>
                <li><b>Name</b></li>
                <li><b>Price</b></li>
                <li><b>Category</b></li>
                <li><b>Company</b></li>
                <li><b>Operation</b></li>
            </ul>
            {
                products.length>0 ? products && products.map((item, i) => {
                    return (<ul >
                        <li>{i + 1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><span onClick={() => deleteProduct(item._id)}>Delete /</span>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>

                    </ul>);
                }
                ):
                <h6><i>No results found...</i></h6>
            }
        </div>
    )
}
