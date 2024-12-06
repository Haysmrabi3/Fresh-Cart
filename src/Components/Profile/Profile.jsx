import React, { useContext } from 'react'
import profileImg from '../../Assets/images/Profile/user.png'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { authContext } from '../../Context/AuthContext'
import { userContext } from '../../Context/UserContext'






export default function Profile() {
    const {setIsLogin} = useContext(authContext)
    const {userName , userRole} = useContext(userContext)
    const Navigate =  useNavigate()

    function logout ( ) {
      setIsLogin(false)
      localStorage.removeItem(`userToken`)
      Navigate(`/Login`)
    }
     


return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart | Profile</title>
    </Helmet>
            <div className="profile">
            <div className="container">
                    <h2> <i className="fa-solid fa-user main-color fs-2"></i> Your profile</h2>
                            <div className="row">
                                <div data-aos="fade-right" className="col-md-6 col-lg-3">
                                <div className="profile-setings shadow text-center">
                                                <div className="profile-img">
                                                <img src={profileImg} width={150} height={150} alt="profile img" />
                                                </div>
                                                <p>{userName}</p>
                                                <span>{userRole}</span>
                                            <div  className="btns pt-3">
                                                <Link  className='btn1 btn-style' to={`/allorders`} > <i className="fa-solid fa-cart-shopping"></i> Your Orders</Link>
                                                <Link className='btn2 btn-style' to={`/fogetpassword`}  ><i className="fa-solid fa-key"></i> Forgot Password</Link>
                                                <button onClick={()=> logout()} className='btn3 btn-style' > <i className="fa-solid fa-right-from-bracket"></i> LogOut</button>
                                            </div>
                                </div>
                                </div>
                                <div data-aos="fade-left" data-aos-duration="1000" className="col-md-7 col-lg-4">
                                <div className="profile-text ">
                                    <p>Hello, <span>{userName}</span></p>
                                    <p>From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and edit your password and account details.</p>
                                </div>

                                </div>
    
                            </div>
            </div>
            </div>
</>
}








