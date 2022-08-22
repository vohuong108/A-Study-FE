import React, { useState, useEffect } from 'react'
import { Menu, Skeleton } from 'antd'
import './Categories.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getCategory } from '../../../../features/common/commonAction'
import { useHistory } from 'react-router-dom'


const Categories = () => {
    const [isHover, setHover] = useState(false);
    const categories = useSelector(state => state.common.category);
    const loadingCategory = useSelector(state => state.common.loadingCategory);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = ({ key}) => {
        console.log("key: ", key);
        if(key) {
            let query = key.split(" ").join("+");
            history.push(`/search/?q=${query}`);
        }
    }

    useEffect(() => {
        let category = async () => {
            let result = await dispatch(getCategory());
        }

        if(!categories) category();
    }, [])
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
                        {
                            <Skeleton active loading={loadingCategory}>
                                <Menu style={{ width: 256 }} className="ctg-menu" onClick={handleClick} selectedKeys={[]}>
                                    {categories && categories.map(ctg => 
                                        <Menu.Item key={ctg.name}>{ctg.name}</Menu.Item>
                                    )}
                                </Menu>

                            </Skeleton>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Categories
