import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { cartContext } from '../../Context/CartContext';
import Aos from 'aos';
import toast from 'react-hot-toast';











export default function ProductDetailes() {
  const {setNumOfCartItems } = useContext(cartContext)

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade : true ,
    autoplay : true ,
    autoplaySpeed: 8000 ,
    lazyLoad: true , 
    arrows:false
  };



const {id} = useParams()

const [product , setProduct] = useState({})

      async function getProduct() {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}` )
        setProduct(data.data)
      }


      async function addToCart (productId) {
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,{
          productId
        }, {
          headers : {
            token : localStorage.getItem(`userToken`)
          }
        } )
        toast.success(data.message)
        setNumOfCartItems(data.numOfCartItems);
        
      }
      
      useEffect(()=> {
        getProduct()
        Aos.init({
          offset: 100,
          easing: 'ease-in-sine',
          delay: 0,
        });
      }, [])

  return <>


    <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart | ProductDetailes</title>
    </Helmet>

          <div className="productDetails">
                <div className="container">
                <div className="row  align-items-center ">

                      <div
                        data-aos={ `fade-right`  }
                        data-aos-duration="1000"
                      className="col-md-4  col-sm-10  p-3">
                                <Slider {...settings }>
                                  {product?.images?.map((img , index ) => {
                                    return <div key={index}>
                                    <img src={img}  height={500} className='rounded-3 w-100' alt="product" />
                                    </div>
                                  } )}
                                </Slider>
                      </div>


                      <div 
                        data-aos={ `fade-left`  }
                        data-aos-duration="1000"
                      className="col-md-6 col-sm-12  p-3">
                          <div className="productInfo">
                          <h3>{product?.title}</h3>
                          <h5 >{product.description}</h5>
                            <h5 className='fs-5 main-color'>{product?.category?.name} </h5>
                          <div className="d-flex justify-content-between">
                            <span className='fs-5 fw-bold'>{product.price} <span className='main-color '  >   EGY </span></span>
                            <button onClick={()=> addToCart (product.id  )   } > <i className="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                          </div>
                          </div>
                        </div>

                </div>
                </div>
          </div>


  
  </>
}
