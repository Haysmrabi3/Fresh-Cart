import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { cartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'
import Aos from 'aos'
import { useNavigate } from 'react-router-dom'



export default function WishList() {

  const [wishlist , setWishList] = useState([])
  const {setNumOfCartItems } = useContext(cartContext)
  const Navigate = useNavigate()


async function getWishListProduct () {
  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
    {headers: {token : localStorage.getItem(`userToken`)}}
  )
  setWishList(data.data)
}



        //////////////  Add To Cart //////////////
        async function addToCart (productId) {
          removeProduct (productId)
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



async function removeProduct (id) {
  const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {
    headers : {token : localStorage.getItem(`userToken`)}
  })
  getWishListProduct()
  toast.success(
    <div className="text-center">
      Your product has been successfully remove from WishList &#129300;
    </div>,
    {
      duration: 1000,
      icon: (
        <div className="fa-2x text-danger">
          <i className="fa-solid fa-heart-crack"></i>
        </div>
      ),
      position: "top-center",
    }
  );
}



useEffect(()=> {
  getWishListProduct()
  Aos.init({
    offset: 100,
    easing: 'ease-in-sine',
    delay: 0,
  });
}, [])




  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart | WishList</title>
    </Helmet>
    <div className="wishList">
      <div className="container">
        <h2   data-aos="fade-right" data-aos-duration="1000"> Your Wishlist items :</h2>
        <div className="row g-3">
          {wishlist == 0  ? 
          <>
          <div className='empty-cart'>
            <i className='fa fa-shopping-cart'></i>
            <p>WishList Is Empty &#128578; !</p>
            <button onClick={()=> Navigate(`/products`)} >  Shop now </button>
          </div>          
    </>
          :
          wishlist?.map((product , index)=> {
            return <div
            data-aos={index % 2 == 0 ? `fade-up` : `fade-down`}
            data-aos-duration="1000"
            key={index} className="col-md-6 col-lg-3">
                <div className="WishListItem ">
                <div className="itemImg text-center">
                        <img src={product.imageCover}  height={200} alt={product.title} />
                </div>
                    <div className="Iteminfo p-2   ">
                        <div className="itemInfo  d-flex  justify-content-between  " >
                            <h4 className='h6 '>{product.title?.split(' ').splice(0, 2).join(' ')}</h4> 
                            <i onClick={()=> removeProduct(product.id)} className="fa-solid fa-trash-can text-danger fs-5"></i> 
                        </div>
                          <span className='main-color'>{product.category.name}</span>
                        <div className="TrendingIcon2  d-flex  justify-content-between">
                        <p>EGY {product.price}</p>
                        <i onClick={()=> addToCart(product.id) } className="fa-solid fa-cart-plus main-color "></i>
                        </div> 
                    </div>
                </div>
            </div>
        })  
          }
        </div>
      </div>
    </div>
  </>
}
