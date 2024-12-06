import React, { useEffect } from 'react'
import img1 from '../../Assets/images/Footer/appstore-btn.svg'
import img2 from '../../Assets/images/Footer/googleplay-btn.svg'
import { Link } from 'react-router-dom'
import Aos from 'aos'







export default function Footer() {


  useEffect(()=> {
    Aos.init({
        offset: 100,
        easing: 'ease-in-sine',
        delay: 0,
      });
}, [])


  return <>
          <div className="Footer">
            <div className="container ">
            <div className="row">

                      <div data-aos="fade-down"  data-aos-duration="1000" className="col-md-6 col-lg-3">
                        <div className="Footer-logo mt-4">
                          <h6 className='fs-3'><i className="fa-solid fa-shop main-color"> </i> Online Shop </h6>
                          <p className='text-muted' >Got any Questions? Call us Today!</p>
                          <button> Get IN Touch </button>
                        </div>
                      </div>



                      <div data-aos="fade-down"  data-aos-duration="1000"  className="col-6 col-lg-3">
                        <div className="footer-contacts mt-4">
                          <h6 className='fs-3'>Contact</h6>
                          <ul>
                            <li><i className="fa-solid fa-phone "></i> : <span>01097521770</span></li>
                            <li><i className="fa-solid fa-envelope"></i> : <span>haysmtabi325@gmail.com</span></li>
                            <li><i className="fa-solid fa-location-dot"></i> : <span>Giza</span></li>
                          </ul>
                          <div className='footer-icons'>
                                <i className="fa-brands fa-facebook "></i>
                                <i className="fa-brands fa-linkedin  "></i>
                                <i className="fa-brands fa-instagram  " ></i>
                                <i className="fa-brands fa-twitter  "></i>
                          </div>
                        </div>
                      </div>

                      <div data-aos="fade-down"  data-aos-duration="1000"  className="col-6 col-lg-2">
                              <div className="footer-links mt-4">
                              <h6 className='fs-3'>Links</h6>
                                <ul>
                                  <li><Link>- All Products</Link></li>
                                  <li><Link>- About</Link></li>
                                  <li><Link>- Contact</Link></li>
                                </ul>
                              </div>
                      </div>




                      <div data-aos="fade-down"  data-aos-duration="1000"  className="col-md-6 col-lg-4 ">
                              <div className="App-links mt-4">
                              <h6 className='fs-4'>Download Our App Now!</h6>
                                  <div className="footer-imges d-flex "> 
                                  <img src={img1}  alt="appStore logo" />
                                  <img src={img2}  alt="googleplay logo" />
                                  </div>
                              </div>
                      </div>






                    </div>
                    <div className="text-center">
                    <p className='fs-5 m-0 pb-2'>Copyright 2024 developed by <span className='main-color ' >Haysm Rabi3</span>. All rights reserved</p>

                    </div>
            </div>

          </div>











  </>
}
