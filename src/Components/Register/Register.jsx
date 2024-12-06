import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link,  useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { userContext } from '../../Context/UserContext'







export default function Register() {
const [error , SetError] = useState(``)
const [isLOading , setIsLOading] = useState(false)
const Navigate  = useNavigate()
const {setUserName} = useContext(userContext)




const validationSchema = Yup.object({
  name : Yup.string().required('name is requierd').min(5 , 'min characters is 5 ').max( 10,'max characters is 8 ' ),
  email : Yup.string().required('email is required').email('invalide email'),
  password : Yup.string().required('password is requierd').matches(/^[A-Z][\w @]{5,8}$/ , 'invalid password ex ( Ahmed123) '),
  rePassword : Yup.string().required('rePassword is requierd').oneOf([Yup.ref('password')]),
  phone : Yup.string().required('phone is requierd').matches(/^01[0125][0-9]{8}$/ , `we need egyptian number`)
})



 let {errors, values, handleBlur , handleSubmit , handleChange , touched , isValid} = useFormik({
    initialValues : {
      name : ``,
      email : ``,
      password : ``,
      rePassword : ``,
      phone : ``
    },
    
    onSubmit : async () => {

      setIsLOading(true)
      try {
        let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values ) 
        console.log(data.message);
        if(data.message === 'success') {
          // localStorage.setItem(`userToken` , data.token)
          setUserName(values.name)
          setIsLOading(false)
          Navigate('/login')
        }
  
      } 
      catch(error) {
        console.log(error);
        
        SetError(error.response.data.message );
        setIsLOading(false)
      }
    } ,
    
    validationSchema ,
  })





  return <>

  <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart | Register</title>
    </Helmet>
        <div className="Register ">
          <div className="container">
                    <div className="register-form  ">
                        <h2>Register Now :</h2>
                        <p className='register-info'>To keep connected with us please register to our website</p>
                    <form  onSubmit={handleSubmit}>
                            <label htmlFor="name">name : </label>
                            <input className='form-control '  value={values.name} onChange={handleChange} onBlur={handleBlur} id='name' name='name' type="text" />
                            {errors.name && touched.name && <p className='alert alert-danger'> <i className="fa-solid fa-x text-danger "></i> {errors.name}</p>} 
                            <label htmlFor="email">email : </label>

                            <input className='form-control'  value={values.email} onChange={handleChange} onBlur={handleBlur} id='email' name='email' type="email" />
                            {errors.email && touched.email && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.email}</p>} 
                            <label htmlFor="password">password : </label>

                            <input className='form-control'  value={values.password} onChange={handleChange} onBlur={handleBlur} id='password' name='password' type="password" />
                            { errors.password && touched.password && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger"></i> {errors.password}</p>} 
                            <label htmlFor="rePassword">rePassword : </label>

                            <input className='form-control'  value={values.rePassword} onChange={handleChange} onBlur={handleBlur} id='rePassword' name='rePassword' type="password" />
                            {errors.rePassword && touched.rePassword && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.rePassword}</p>} 
                            <label htmlFor="phone">phone : </label>
                            
                            <input className='form-control'  value={values.phone} onChange={handleChange} onBlur={handleBlur} id='phone' name='phone' type="tel" />
                            {errors.phone && touched.phone && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.phone}</p>} 
                                <div className="d-inline ">
                                <button className='mt-3' disabled ={!isValid || isLOading  } type='submit'>Submit</button>
                                </div>
                                <div className="ms-5 d-inline-block w-75">
                                {error? <p className='alert alert-danger  text-center' > {error} </p> :`` }
                                </div>
                                <span className='d-block'>Aleady a member ? <Link to={`/login`} >Login</Link></span>
                              
                    </form>

                    </div>


          </div>
        </div>














      {/* <div className="w-75 m-auto my-5">


          
      </div> */}
  
  
  
  </>
}
