import Aos from 'aos';
import React, { useEffect } from 'react'








export default function Subscribe() {
  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, [])



  return <>
<div
data-aos="zoom-in"
data-aos-duration="1000"
className="subscribe-section ">
<div className="container ">
            <div className="row">
                <div 
                className="col-lg-6 ">
                        <div className="info-side">
                        <h6>SUBSCRIBE US NOW</h6>
                        <p className='text-muted'>Get latest news, updates and deals directly mailed to your inbox.</p>
                        <span>Follow us:</span>
                        <span><i className="fa-brands fa-facebook"></i></span>
                        <span><i className="fa-brands fa-twitter"></i></span>
                        <span><i className="fa-brands fa-instagram"></i></span>
                        </div>
                </div>
                <div className="col-lg-6 mt-3 ">
                            <div className="inputSide">
                            <input placeholder=' Your Email Adress Hear ' type="text" />
                            <button  >Subscribe</button>
                            </div>
                </div>
            </div>
        </div>
</div>
  </>
}
