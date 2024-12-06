import Aos from 'aos'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'








export default function Categories() {



async function getCategories () {
  let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  return res.data.data
}

const {data , isLoading} = useQuery(`getCategories` , getCategories )

useEffect(()=>{
  getCategories ()
  Aos.init({
    offset: 100,
    easing: 'ease-in-sine',
    delay: 0,
  });
} , [] )



  return <> 
      <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart | Categories</title>
    </Helmet>
<div className="Categories">
  
<ul data-aos="zoom-in" data-aos-duration="1000" className='Categories-menu'>
  <li><Link>Beauty & Health</Link></li>
  <li><Link>Mobiles</Link></li>
  <li><Link>Electronics</Link></li>
</ul>

<div className="Categories-items">
<div className="container">
        <div className="row g-4">
        {isLoading? `` : data?.map((categoty , index)=> {
       return <div 
            data-aos={index % 2 == 0 ? `fade-up` : `fade-down`}
            data-aos-duration="1000"
       key={index} className="col-md-4 col-lg-3    ">
                <div className="cat-item shadow rounded-3 text-center  ">
                <div className="item-img">
                  <img src={categoty.image}  alt={`category name is ${categoty.name}`}  />
                  <div className="category-btn">
                      <button >Details</button>
                      </div>
                </div>
                <div className="item-info text-center main-color p-3">
                    <h4>{categoty.name}</h4>
                    
                </div>

                </div>
              </div>
    } )}
        </div>
      </div>
</div>


</div>
  </>

}
