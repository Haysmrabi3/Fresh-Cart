import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





export default function Allorders() {
  const [Allorders , setAllorders]= useState([])
  const Navigate = useNavigate()
  async function getAllOrders(id) {
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + id)
    setAllorders(data)
  }

  
  
  
  useEffect(()=>{
    const {id} = jwtDecode(localStorage.getItem("userToken"))
    getAllOrders(id)
},[])

  return <>

                <div className="Allorders">
                <div className="container">
                  <h2 className='h1'>Your Orders</h2>



                  {Allorders.length === 0 
                  ? 
                  <>
                  <div className='empty-cart'>
                            <i className='fa fa-shopping-cart'></i>
                            <p>Your Order Is Empty &#128578; !</p>
                    
                            <button  onClick={()=> Navigate(`/products`)} >  Shop now </button>
                          </div>
                  </>

                  :

                  <>
                  {Allorders?.map((order , index)=>{
                    return <div key={index} className="row">
                      <div className="order shadow rounded p-4 my-5">
                        <div className="d-flex align-items-center">
                          <h2 className='fw-bolder h1'>#{order.id}</h2>
                          <h4 className='fw-bold text-primary mx-4'>processing</h4>
                        </div>
                        <p>You Have Orderd {order.cartItems.lenght} items.</p>
                        <div className="d-flex flex-wrap">
                          {order.cartItems.map((item)=>{
                            return <img key={item._id} src={item.product.imageCover} style={{width: 150 , margin : 5 }} alt="product image" />
                          })}
                        </div>
                        <hr />
                        <p> <strong>Total amount:</strong> {order.totalOrderPrice} EGP</p>
                      </div>
    
                    </div>
                  })}
                  </>
                
                }
                </div>
                </div>
  </>
}
