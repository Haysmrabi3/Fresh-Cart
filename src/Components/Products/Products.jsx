import React from 'react'
import AllProducts from '../AllProducts/AllProducts'
import { Helmet } from 'react-helmet'


export default function Products() {







  return<>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart | Products</title>
    </Helmet>


<div className="AllProducts">
<ul className="nav nav-pills mb-3  d-flex justify-content-center mt-5 " id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active fs-4" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
    type="button" role="tab" aria-controls="pills-home" aria-selected="true">Men's </button>
  </li>

  <li className="nav-item" role="presentation">
    <button className="nav-link fs-4" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" 
    type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Women's </button>
  </li>


  <li className="nav-item" role="presentation">
    <button className="nav-link fs-4" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" 
    type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Electronics</button>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">

  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
  <div className="container">
          <div className="eow">
          <AllProducts type ="Men's Fashion"/>
          </div>
        </div>
  </div>



  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <div className="container">
        <div className="row">
        <AllProducts type="Women's Fashion"/>
        </div>
      </div>
  </div>



  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            <div className="container">
              <div className="row">
              <AllProducts type="Electronics" />
              </div>
            </div>
  </div>
</div>
</div>

  </>


















}
