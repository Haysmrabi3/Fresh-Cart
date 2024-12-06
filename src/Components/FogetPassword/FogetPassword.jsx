import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { authContext } from '../../Context/AuthContext'
import { Helmet } from 'react-helmet'


export default function FogetPassword() {

 const [error , SetError] = useState(``)
const [ isLoadig , setIsLOading] = useState(false)
const [message , setMessage] = useState(false)
const Navigate  = useNavigate()


const {setIsLogin} = useContext(authContext)



let validationSchema = Yup.object({
email : Yup.string().required('email is required').email('invalide email'),
})


let {errors, values, handleBlur , handleSubmit , handleChange , touched , isValid} = useFormik({
    initialValues : {
    email : ``,
    },
    
    onSubmit : async () => {

        setIsLOading(true)
    try {
        let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
        if(data?.statusMsg === 'success') {
        setIsLOading(false)
        localStorage.setItem(`userToken` , data.token)
        setIsLogin(true)
        setMessage(data.message)
        setTimeout(() => {
            Navigate('/verifycode')
        }, 2000);
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
    <title>Fresh Cart | FogetPassword</title>
    </Helmet>
    
    <div className="Login">
            <div className="container">
            <div className="Login-form ">
        <h2>Foget Password :</h2>

        <form  onSubmit={handleSubmit}>

            <label htmlFor="email">email</label>
            <input className='form-control'  value={values.email} onChange={handleChange} onBlur={handleBlur} id='email' name='email' type="email" />
            {errors.email && touched.email && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.email}</p>} 



                <div className=" submit-btn   d-inline-block">
                <button  disabled={!isValid }   type='submit'>Submit</button>
                </div>
                    <div className="error ms-5 d-inline-block w-75">
                    {error? <p className='alert alert-danger  text-center' > {error} </p> :`` }
                    {message? <p className='alert alert-success  text-center' > {message} </p> :`` }
                </div>
            </form>
    </div>
            </div>
    </div>


</>
}
