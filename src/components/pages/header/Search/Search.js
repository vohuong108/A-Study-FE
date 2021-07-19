import React from 'react'
import 'antd/dist/antd.css';
import { SearchOutlined } from '@ant-design/icons'
import './Search.css'

const Search = () => {
    return (
        <div className="search">
            <div className="search-wrap">
                <SearchOutlined className="search-icon"/>
                <input type="text" placeholder="Searching for anything"/>

            </div>
        </div>
    )
}

export default Search
