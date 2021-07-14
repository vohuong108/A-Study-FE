import React, { useState } from 'react'
import './Categories.css'


const data = {

}
const Categories = () => {
    const [isHover, setHover] = useState(false);

    console.log("re-render")

    return (
        <div 
            className="categories" 
            onMouseMove={() => isHover === false ? setHover(true) : ''} 
            onMouseLeave={() => setHover(false)}
        >
            <div className="ctg-wrap">
                <div className="ctg-title" >Categories</div>
                <div className={`ctg-wrap__pop ${isHover ? 'pop-act' : ''}`}>
                    <div className="ctg-pop">
                        pop
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Categories
