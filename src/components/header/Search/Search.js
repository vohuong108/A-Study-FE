import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './Search.css'

const Search = () => {
    return (
        <div className="search">
            <div className="search-wrap">
                <SearchIcon className="search-icon"/>
                <input type="text" placeholder="Searching for anything"/>

            </div>
        </div>
    )
}

export default Search
