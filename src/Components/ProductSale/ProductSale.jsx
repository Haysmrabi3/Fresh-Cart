import Aos from 'aos';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const ProductSale = () => {
  Aos.init({
    offset: 100,
    easing: 'ease-in-sine',
    delay: 0,
  });

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("10 23, 2025").getTime();
      const now = new Date().getTime();
      let difference = targetDate - now;

      if (difference < 0) {
        difference = 0; 
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    const updateCountdown = () => {
      const { days, hours, minutes, seconds } = calculateTimeLeft();
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);


    
  }, []);





    /* ================== Get Products ======================= */

    async function getTrandingProducts() {
      try {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        return data.data
      }
      catch (error) { console.log(error) }
  
    }
    let { data } = useQuery("trandingProducts", getTrandingProducts)
  
  


  return <>
    <section className='product-sale'>
      <div className='container'>
        <div className='row shadow'>

          {/* Img */}
          <div className='col-md-6 '>
            <div 
            data-aos="fade-right"
            data-aos-duration="1000"
            className='image  py-5' >
              <img src={require('../../Assets/images/Sale/laptop.png')} alt="dell"></img>
            </div>
          </div>


          <div className='col-md-6 shadow '>
            <div className='info py-5'>
              {/* Sale */}
              <div className="sale">
                <p className='bg-danger  p-2 rounded-4 mb-3 d-inline-block text-light'  >Up to 50% Off</p>
              </div>

              {/* Title */}
              <div className='product-data'>
                {data?.slice(39, 40).map((product) => <div key={product.id}>
                  <h2 data-aos="fade-left"  data-aos-duration="1000" >{product.title.split(' ').splice(0, 2).join(' ')}</h2>
                  <div className='price'>

                    <p className='old-price' >   EGY   {product.price * 2}  </p>
                    <p className='new-price'  > EGY  {product.price}</p>
                  </div>
                </div>)}
                <h4 data-aos="fade-up"  data-aos-duration="1000" >Limited Time Offer</h4>
              </div>

              {/* Date */}
              <div className='date shadow'>
                <div>
                  <span data-aos="fade-up"  data-aos-duration="1000">{days} </span>
                  <span >Days</span>
                </div>
                <span className='dot'>:</span>
                <div>
                  <span data-aos="fade-down"  data-aos-duration="1000" >{hours}</span>
                  <span >Hours</span>
                </div>
                <span className='dot'>:</span>

                <div>
                  <span data-aos="fade-up"  data-aos-duration="1000">{minutes}</span>
                  <span >Minutes</span>
                </div>
                <span className='dot'>:</span>

                <div>
                  <span data-aos="fade-down"  data-aos-duration="1000">{seconds}</span>
                  <span >Seconds</span>
                </div>

              </div>
              {/* Btn */}
              <div className='btns'>
                <Link to={`/productdetails/6408da1c6406cd15828e8f0a`}>
                  <button>
                    Show Now
                  </button>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section >
  
  
  
  </>
};

export default ProductSale;
