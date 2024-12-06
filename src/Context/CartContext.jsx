import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'












export const cartContext = createContext()


export default function CartContextProvider({children}) {



const [cartId , setCartId] = useState(0)
const [numOfCartItems, setNumOfCartItems] = useState(0)
const [cartProducts, setCartProducts] = useState(null)
const [totalCartPrice, setTotalCartPrice] = useState(0)







async function getLoggedUserCart() {
    try {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            });
        setNumOfCartItems(data.numOfCartItems)
        setTotalCartPrice(data.data.totalCartPrice)
        setCartProducts(data.data.products)
        setCartId(data.data._id)
        return data;
    } catch (error) {
        return error;
    }

}










useEffect(() => {
    getLoggedUserCart()
}, [])





  return <>
            <cartContext.Provider value={{ cartId , setCartId  ,setNumOfCartItems ,numOfCartItems ,setCartProducts ,cartProducts ,setTotalCartPrice , totalCartPrice}}>
            {children}
            </cartContext.Provider>
  </>
}
