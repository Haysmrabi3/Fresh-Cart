import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import Aos from 'aos';







export default function Cart() {

const [CartData , setCartData] = useState({})
const [isLoading , setIsLoading] = useState(true)
const {setCartId ,numOfCartItems  , setNumOfCartItems } = useContext(cartContext)
const Navigate = useNavigate()



async function getLoggedUserCart() {
  setIsLoading(true)
try {
  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
    headers: {
      token : localStorage.getItem(`userToken`)
    }
  })
  setCartData(data.data);
  setNumOfCartItems(data.numOfCartItems);
  setCartId(data.data._id);
  setIsLoading(false)
} catch (error) {
  return error
}
}


     function DeleteProduct(productId) {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then( async (result) => {
        if (result.isConfirmed) {

          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers : {
              token : localStorage.getItem(`userToken`)
            }
          })
          setCartData(data.data)
          setNumOfCartItems(data.numOfCartItems);
    
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
    }


        async function upDateProductCount (productId , count) {
            if(count == 0){
              DeleteProduct(productId)
            }else{
          const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count
          } , {
            headers : {
              token : localStorage.getItem(`userToken`)
            }
          })
          setCartData(data.data);
          setNumOfCartItems(data.numOfCartItems);
            }
        }

    

        async function clearCart() {
          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
              token : localStorage.getItem(`userToken`)
            }
          })
          setCartData(data)
          setNumOfCartItems(0);

        }




useEffect(()=> {
  getLoggedUserCart()
  Aos.init({
    offset: 100,
    easing: 'ease-in-sine',
    delay: 0,
  });
} , [])



  return  <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart | Cart</title>
    </Helmet>


  <div className="cart">
    <div className="container">
      <h2 data-aos="fade-left" data-aos-duration="1000" > <i className="fa-solid fa-cart-shopping main-color mb-3"></i> Your cart items : </h2>
        {isLoading
        ? 
        ``
        :
        <>
        
        </>
        }

      <div className="row ">
      <div className="col-md-12 col-lg-8 m-0 p-0">
              <div className="Products-count  ">
                  <p >Product : {numOfCartItems} </p>
                  <p>Total :  <span className='main-color' >{CartData.totalCartPrice || 0 } EGY</span></p>
              </div>

              {!CartData || numOfCartItems === 0
                    ?
                    <>
                          <div className='empty-cart '>
                            <i className='fa fa-shopping-cart'></i>
                            <p>Cart Is Empty &#128578; !</p>
                    
                            <button  onClick={()=> Navigate(`/products`)} >  Shop now </button>
                          </div>
                                      
                    </>
                    :
                  
                    <>
                        {CartData.products?.map((product , index)=> {
                          return   <div
                          data-aos="zoom-in-up" data-aos-duration="1000"
                          key={index} className="Product shadow ">
                              
                                            <div className='product-img'>
                                                  <img src={product.product.imageCover} width={100} height={120} alt={product.name} />
                                            </div>
                                            <div className="cartDetails col-md-4">
                                                <h4>{product.product.title.split(' ').slice(0,2).join(' ')}</h4>
                                            </div>
                                            <div className="btns "> 
                                            <button onClick={()=> upDateProductCount (product.product._id ,product.count+1 ) }  >+</button>
                                            <span>{product.count} </span>
                                            <button onClick={()=> upDateProductCount (product.product._id , product.count-1) }   >-</button>
                                            </div>
                                            <div className="product-price">
                                                <p>{product.price} <span className=' '>EGY</span> </p>
                                            </div>
                                            <div className="delete-btn">
                                              <i onClick={()=> DeleteProduct(product.product._id)} className="fa-solid fa-trash-can text-danger"></i>
                                            </div>
                                    </div>
                          })}
                  <div className="clear-btn text-end">
                      <button onClick={()=> clearCart()}>clear</button>
                  </div>
                    </>
                  }
            </div>

            <div
            data-aos="fade-left" data-aos-duration="1000"
            className="col-lg-4 col-md-12 ">
              <div className="product-d">
                    <div className="product-head">
                    <h5>Payment Details</h5>
                    </div>
                    <div className="product-info">
                    <h6>Total Products </h6>
                    <span className='main-color'>{numOfCartItems || 0 } </span>
                    </div>
                    <div className='product-info'>
                    <h6>Total Price </h6>
                    <span className='main-color'> {CartData.totalCartPrice || 0 } EGY</span>
                    </div> 
                    <div className="check-btn">
                    <button><Link  to={"/onlinepayment"} >Checkout</Link></button>
                    </div>
                    <div className="shopping-link">
                    <Link to={'/products'}><i className="fa-solid fa-arrow-left fa-beat mx-2"></i>Return To shopping</Link>
                    </div>
              </div>
            </div>

      </div>
    </div>
  </div>
  
  </>




}
