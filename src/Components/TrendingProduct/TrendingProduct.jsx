import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { WishListContext } from '../../Context/WishListConteaxt';
import { cartContext } from '../../Context/CartContext';

export default function TrendingProduct() {
    const { wishlist , addTowishList ,removeProduct } = useContext(WishListContext)
    const {setNumOfCartItems } = useContext(cartContext)
    const [products , setProducts] = useState([])



    /////// get the product ///////
    async function getTrendingProduct() {
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            setProducts(data.data);
        } catch (error) {
            return error 
        }
    }
    

        //////////////  Add To Cart //////////////
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

    async function addProductToWishList(id) {
        if (wishlist.includes(id)) {
          removeProduct(id);
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
        else {
          await addTowishList(id)
          toast.success(
            <div className="text-center">
              Your product has been successfully Added To WishList &#129303;
            </div>,
            {
              duration: 1000,
              icon: (
                <div className="fa-2x text-danger">
                  <i className="fa-solid fa-heart"></i>
                </div>
              ),
              position: "top-center",
            }
          );
        }
      }


    useEffect(()=> {
        getTrendingProduct()
    }, [])
    
    




  return <>
        <section className='TrendingProduct'>
        <div className="container">
        <h2>TrendingProduct</h2>
    <div className="row gy-3">
        {products?.slice(35,39  ).map((product , index)=> {
            return <div key={index}
            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
            data-aos-duration="1000"
            data-aos-delay={`${index * 100}`}
             className="col-md-6 col-lg-3">
                <div className="TrendingItem ">
                <div className="TrendingIcon ">
                <i onClick={()=> {addProductToWishList(product.id)}}  className={`fa-solid fa-heart ${wishlist.includes(product.id) ? " main-color" : "text-main"} `} ></i>
                </div>
                <div className="itemImg text-center">
                       <Link to={`/productdetails/${product.id}`}>
                       <img src={product.imageCover}  height={200} alt={product.title} />
                       </Link>
                </div>
                    <div className="Iteminfo p-2   ">
                        <div className="itemInfo  d-flex  justify-content-between  " >
                            <h4 className='h6 '>{product.title.split(' ').splice(0, 2).join(' ')}</h4> 
                            <i className="fa-solid fa-star text-warning "><span className='text-muted'>{product.ratingsAverage}</span></i> 
                        </div>
                          <span className='main-color'>{product.category.name}</span>
                        <div className="TrendingIcon2  d-flex  justify-content-between">
                        <p>EGY {product.price}</p>
                        <i onClick={()=> addToCart(product.id) } className="fa-solid fa-cart-plus main-color"></i>
                        </div> 
                    </div>
                </div>
            </div>
        })}
    </div>
  </div>
        </section>
  </>
}
