import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { cartContext } from '../../Context/CartContext';


export default function OnlinePayment() {

const {cartId} = useContext(cartContext)
const [error , SetError] = useState(``)
const [isLOading , setIsLOading] = useState(false)
const Navigate  = useNavigate()





let validationSchema = Yup.object({
    details : Yup.string().required('details is required'),
    phone :Yup.string().required('phone is requierd').matches(/^01[0125][0-9]{8}$/ , `we need egyptian number`),
    city : Yup.string().required('city is required'),


})


 const {errors, values, handleBlur , handleSubmit , handleChange , touched , isValid} = useFormik({
    initialValues : {
        details : ``,
        phone : ``,
        city : ``,
    },
    
    onSubmit : async () => {
      setIsLOading(true)
      try {
        let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , 
            { shippingAddress: values } ,
            {headers : {token : localStorage.getItem(`userToken`)}} ,
            {params : {url : `http://localhost:3000/home`}}
         ) 
        if(data?.status == 'success') {
          setIsLOading(false)
          window.open(data.session.url)
          Navigate(`/`)
        }
  
      } 
      catch(error) {
        SetError(error.response.data.message );
        setIsLOading(false)
      }
    } ,
    
    validationSchema ,
  })


  return <>

<Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart | Check out</title>
    </Helmet>
      
      <div className="payment">
            <div className="container">
            <div className="pay-form ">
          <h5>Check out :</h5>
          <form  onSubmit={handleSubmit}>

              <label htmlFor="details">details</label>
              <input className='form-control'  value={values.details} onChange={handleChange} onBlur={handleBlur} id='details' name='details' type="text" />
              {errors.details && touched.details && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.details}</p>} 

              <label htmlFor="phone">phone</label>
              <input className='form-control'  value={values.phone} onChange={handleChange} onBlur={handleBlur} id='phone' name='phone' type="text" />
              { errors.phone && touched.phone && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.phone}</p>} 



              <label htmlFor="city">city</label>
              <input className='form-control'  value={values.city} onChange={handleChange} onBlur={handleBlur} id='city' name='city' type="text" />
              { errors.city && touched.city && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.city}</p>} 



                
                  <div className=" submit-btn   d-inline-block">
                  <button  disabled={!isValid || isLOading}   type='submit'>Submit</button>
                  </div>

                  <div className="error ms-5 d-inline-block w-75">
                    {error? <p className='alert alert-danger  text-center' > {error} </p> :`` }
                  </div>

            </form>
      </div>
            </div>
      </div>
  
</>
}
