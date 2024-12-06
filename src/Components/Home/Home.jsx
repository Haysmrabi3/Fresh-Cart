import React, { useEffect, useState } from 'react'
import Mainslider from '../Mainslider/Mainslider';
import OfferBnner from '../OfferBanner/OfferBnner';
import TrendingProduct from '../TrendingProduct/TrendingProduct';
import ProductSale from '../ProductSale/ProductSale';
import BestSale from '../BestSale/BestSale';
import Testimonial from '../Testimonial/Testimonial';
import Subscribe from '../Subscribe/Subscribe';
import AllProducts from '../AllProducts/AllProducts';
import {Helmet} from "react-helmet";




export default function Home() {


 

  return <>
  
  <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart | Home</title>
  </Helmet>
<Mainslider/>
<OfferBnner/>
<TrendingProduct/>
<ProductSale/>
<BestSale/>
<Testimonial/>
<Subscribe/>
<AllProducts/>


  </>
}
