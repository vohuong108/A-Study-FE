import React from 'react'
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import './Search.scss'

const Search = () => {
    const history = useHistory();
    
    const handleSearch = (e) => {
        if(e.key === 'Enter') {
            let value = e.target.value.trim();

            if(value !== '') {
                let query = value.split(" ").join("+");
                history.push(`/search/?q=${query}`);
            }
        }

        
    }


    return (
        <div className="search">
            <SearchOutlined className="search-icon"/>
            <input type="text" placeholder="Searching for anything" onKeyUp={(e) => handleSearch(e)}/>
        </div>
    )
}

export default Search
