import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { Helmet } from 'react-helmet'



export default function ResetPassword() {
const [error , SetError] = useState(``)
const [isLOading , setIsLOading] = useState(false)
const Navigate  = useNavigate()



let validationSchema = Yup.object({
    email : Yup.string().required('email is required').email('invalide email'),
    newPassword : Yup.string().required('password is requierd').matches(/^[A-Z][\w @]{5,8}$/ , 'invalid password ex ( Ahmed123) '),
})

let {errors, values, handleBlur , handleSubmit , handleChange , touched , isValid} = useFormik({
    initialValues : {
        email : ``,
        newPassword : ``,
    },
    
    onSubmit : async () => {
    setIsLOading(true)
    try {
        let {data} =  await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values ) 
            localStorage.setItem(`userToken` , data.token )
            Navigate(`/home`)
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
    <title>Fresh Cart | ResetPassword</title>
    </Helmet>
    <div className="Login">
            <div className="container">
            <div className="Login-form ">
        <h2>Reset Password:</h2>
        <form  onSubmit={handleSubmit}>
            <label htmlFor="email">email : </label>
            <input className='form-control mt-3'  value={values.email} onChange={handleChange} onBlur={handleBlur} id='email' name='email' type="email" />
            {errors.email && touched.email && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.email}</p>} 

            <label htmlFor="newPassword">newPassword : </label>
            <input className='form-control mt-3'  value={values.newPassword} onChange={handleChange} onBlur={handleBlur} id='newPassword' name='newPassword' type="text" />
            {errors.resetCode && touched.newPassword && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.newPassword}</p>} 
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

















