import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { Helmet } from 'react-helmet'


export default function VerifyCode() {
const [error , SetError] = useState(``)
const [isLOading , setIsLOading] = useState(false)
const Navigate  = useNavigate()



let validationSchema = Yup.object({
    resetCode : Yup.string().required('VerifyCode is required'),
})

let {errors, values, handleBlur , handleSubmit , handleChange , touched , isValid} = useFormik({
    initialValues : {
        resetCode : ``,
    },
    onSubmit : async () => {
    setIsLOading(true)
    try {
        let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values ) 
        if(data?.status === 'Success') {
            setIsLOading(false) 
            Navigate('/ResetPassword')
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
    <title>Fresh Cart | VerifyCode</title>
    </Helmet>
    
    <div className="Login">
            <div className="container">
            <div className="Login-form ">
        <h2>Verify Code:</h2>

        <form  onSubmit={handleSubmit}>

            <label htmlFor="resetCode">Verify Code : </label>
            <input className='form-control mt-3'  value={values.resetCode} onChange={handleChange} onBlur={handleBlur} id='resetCode' name='resetCode' type="text" />
            {errors.resetCode && touched.resetCode && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.resetCode}</p>} 
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





















