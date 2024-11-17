import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'
import { cartContext } from '../../Context/CartContext'

export default function Navbar() {




 
 const {numOfCartItems} = useContext(cartContext)
 const {isLogin } = useContext(authContext)


 
  return <>
  
  <nav className="navbar main-navbar navbar-expand-lg shadow ">
  <div className="container  ">
    <NavLink className="navbar-brand main-color" to={`home`}> <i className="fa-solid fa-store"></i> Online Shop  </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse "  id="navbarSupportedContent">



    {isLogin
    &&
    <ul className="navbar-nav m-auto p-3 mb-lg-0">
    <li className="nav-item ">
      <NavLink className="nav-link" to={`home`}>home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link " to={`products`}>products</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link " to={`categories`}>categories</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link " to={`profile`}>profile</NavLink>
    </li>


  </ul>

    }   
    {isLogin 
    
    ?  

    <>
    <ul className='logged-nav mt-3'>
    <li className="nav-item">
    <Link to={`/Wishlist`} > <i className="fa-solid fa-heart main-color fs-3"></i></Link>
    </li> 
    <li className="nav-item cartLink">
            <Link to={`/cart`} > <i className="fa-solid fa-cart-shopping main-color fs-3"><span>{numOfCartItems}</span></i></Link>
            
    </li> 
    <li className="nav-item">
            <Link to={`/allorders`} > <i className="fa-solid fa-basket-shopping main-color fs-3"></i></Link>
    </li> 
    </ul>
    </>
    
        :
        <ul className="navbar-nav mb-2 mb-lg-0  ms-auto">
        <li className="nav-item p-2">
          <NavLink className="nav-link text-secondary" to={`regestier`}>regestier</NavLink>
        </li>
        <li className="nav-item p-2">
          <NavLink className="nav-link text-secondary" to={`login`}>login</NavLink>
        </li>
      
      </ul>
    }



    </div>
  </div>
</nav>
  
  </>
}
