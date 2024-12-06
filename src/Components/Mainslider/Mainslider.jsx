import React, { useEffect } from 'react'
import Slider from 'react-slick'
import img2 from "../../Assets/images/main-slider/main3.jpeg"
import img1 from "../../Assets/images/main-slider/main1.jpeg"
import Aos from 'aos';









export default function Mainslider() {



    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade : true ,
        autoplay : true ,
        autoplaySpeed: 8000 ,
        lazyLoad: true ,
        arrows: false,
      };
    



      useEffect(() => {

        Aos.init({
          offset: 100,
          easing: 'ease-in-sine',
          delay: 0,
        });
      }, [])
  return <>

            <section className='main-slider ' >
                        <div className="container">
                <div className="  slider ">
                    {/* {slider} */}
                    <Slider {...settings}>
                        <img src={img1} alt="product" />
                        <img src={img2} alt="product" />
                    </Slider>
                    </div>

                    <div className="main-info  ">
                    <div className="container">
                        <div className="row gy-3">

                            <div  className="col-md-6 col-lg-3 ">
                                
                                <div className="main-slider-info">
                                <div className="main-slider-icon ">
                                <i className="fa-solid fa-truck fs-4 mx-3"></i>
                                </div>
                                <div className="main-slider-text">
                                <h3>FREE DELIVERY </h3>
                                <p>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
                                </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3 ">
                                
                                <div className="main-slider-info">
                                <div className="main-slider-icon ">
                                <i className="fa-solid fa-award  fs-4 mx-3 "></i>
                                </div>
                                <div className="main-slider-text">
                                <h3>QUALITY GUARANTEE</h3>
                                <p>Dolor sit amet orem ipsu mcons ectetur adipi elit.</p>
                                </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3 ">
                                
                                <div className="main-slider-info">
                                <div className="main-slider-icon ">
                                <i className="fa-solid fa-shield-halved fs-4 mx-3 "></i>
                                </div>
                                <div className="main-slider-text">
                                <h3>100% SECURE PAYMENT</h3>
                                <p>Rem Lopsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3 ">
                                
                                <div className="main-slider-info">
                                <div className="main-slider-icon ">
                                <i className="fa-solid fa-coins fs-4 mx-3"></i>
                                </div>
                                <div className="main-slider-text">
                                <h3>DAILY OFFERS</h3>
                                <p>Amet consectetur adipi elit loreme ipsum dolor sit.</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        
                    
                        </div>
            </section>




  
  </>
}
