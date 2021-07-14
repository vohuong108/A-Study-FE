import React, { useState } from 'react'
import './HeaderCart.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const HeaderCart = () => {
    const [isHover, setHover] = useState(false);

    return (
        <div 
            className="header-cart" 
            onMouseMove={() => isHover === false ? setHover(true) : ''} 
            onMouseLeave={() => setHover(false)}
        >
            <div className="cart-wrap">
                <ShoppingCartIcon className="cart-icon"/>
                <div className={`cart-wrap__pop ${isHover ? 'pop-act' : ''}`}>
                    <div className="cart-pop">
                        pop
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default HeaderCart

