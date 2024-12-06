import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Aos from 'aos';

export default  function  OfferBnner () {
const [products , setProducts] = useState([])

async function getOfferdProducts() {
    try {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        setProducts(data.data);
    } catch (error) {
        console.log(error);
    }
}



useEffect(()=> {
    getOfferdProducts()
    Aos.init({
        offset: 100,
        easing: 'ease-in-sine',
        delay: 0,
      });
}, [])





  return <>
  <div className="container">
    <div className="row ">
        {products?.slice(38,40  ).map((product , index)=> {
            return <div key={index} data-aos="zoom-in-down" data-aos-duration="1000" className="col-md-6">
                <div className="offerdProduct ">
                    <div className="offerdItem d-flex  justify-content-around py-4 ">
                        <div className="itemInfo align-content-center main-color" >
                            <span>Upto 40% off</span>
                            <h4>{product.title.split(' ').splice(0, 2).join(' ')}</h4>
                                <Link to={`/productdetails/${product.id}`} >
                                <button>Shop Now </button>
                                </Link>
                        </div>
                        <div className="window">
                        <div className="itemImg">
                        <img src={product.imageCover}  height={150} alt={product.title} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        })}
    </div>
  </div>
  
  </>
}
