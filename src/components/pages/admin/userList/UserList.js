import React from 'react'
import "./userlist.scss"
import { DataGrid } from '@mui/x-data-grid';
import {DeleteForever} from '@mui/icons-material';
 import { userRows } from '../data';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Api = 'https://jsonplaceholder.typicode.com';
const APIuser='https://6190c079f6bf450017484cb1.mockapi.io/Userlist/userl';
export default function User() {



  
    const [data, setData] = useState([]);
    const getUserList = () =>{
      fetch(`${APIuser}`)
        .then(res => res.json())
        .then(json => setData(json));
    }
    useEffect(() => {
      getUserList();
  }, []);
  
  const handleDelete = async (id) =>{
     await axios.delete(APIuser + '/' + id);
     setData(data.filter((item) =>  item.id !== id)); 
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
      field:"action",
      headerName:"action",
      width: 150,
      renderCell:(params) => {
          return(
              <>
              <Link to={"/admin/user/" + params.row.id}>
              <button className="userEdit">Edit</button>
              </Link>
              <DeleteForever className="userDel" onClick={()=>handleDelete(params.row.id)}/>
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
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      /> 
        </div>
    )
}
