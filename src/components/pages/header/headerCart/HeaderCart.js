import React, { useState } from 'react'
import './HeaderCart.css'
import 'antd/dist/antd.css';
import { ShoppingCartOutlined } from '@ant-design/icons'

const HeaderCart = () => {
    const [isHover, setHover] = useState(false);

    return (
        <div className="header-cart" >
            <div 
                className="cart-wrap"
                onMouseMove={() => isHover === false ? setHover(true) : ''} 
                onMouseLeave={() => setHover(false)}
            >
                <ShoppingCartOutlined className="cart-icon"/>
                <div className={`cart-wrap__pop ${isHover ? 'pop-act' : ''}`}>
                    <div className="cart-pop">
                        <div className="pop-container">
                            <span>Your cart is empty</span>
                            <a href="/">Keep Shopping</a>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default HeaderCart

