import React from 'react'
import "./userlist.scss"
import { DataGrid } from '@mui/x-data-grid';
import {DeleteForever} from '@mui/icons-material';
 import { userRows } from '../data';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const final_base ="http://localhost:8888/api"


export default function User() {

    const [data, setData] = useState([]);
    const getUserList = async () =>{
      const url = `${final_base}/userlist`
      const response = await axios.get(url);
      setData(response.data); 
    }
    useEffect(() => {
      getUserList();
    }, []);
  
    

    const handleDelete = async (id) =>{
     
    }



  const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Username', width: 200},
  { field: 'email', headerName: 'email', width: 200 },
  {
    field: 'status',
    headerName: 'status',
    width: 200,
  },
  {
    field: 'phone',
    headerName: 'phone number',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    
  },
  {
    field: "permission",
    headerName:"Permission",
    width: 100,
    renderCell:() => {
      return(
          <>
          <select id="level-select">        
            <option value="admin">Amin</option>
            <option value="author">Author</option>
            <option value="student">Student</option>
          </select>
          </>
      )
  }

  },

  {
      field:"action",
      headerName:"action",
      width: 150,
      renderCell:(params) => {
          return(
              <>
              <Link to={"/user" + params.row.id}>
              <button className="userEdit">Edit</button>
              </Link>
              <DeleteForever className="userDel" onClick={this.handleDelete.bind(this, params.row.id)}/>
              </>
          )
      }
  }
];


    return (
        <div className="UserList">
            <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      /> 
        </div>
    )
}
