import React from 'react'
import "./userlist.scss"
import { DataGrid } from '@mui/x-data-grid';
import {DeleteForever} from '@mui/icons-material';
 import { userRows } from '../data';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function User() {
  const [data,setData] = useState(userRows);
  
  const handleDelete = (id) =>{
    setData(data.filter((item) =>  item.id !== id))
  }

  const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'userName', headerName: 'Username', width: 200
  ,renderCell: (params)=>{
      return (
          <div className="userListUser">
              <img className="userImg" src={params.row.avatar} alt="" />
              {params.row.userName}
          </div>
      )
  } 
},
  { field: 'email', headerName: 'email', width: 200 },
  {
    field: 'status',
    headerName: 'status',
    width: 200,
  },
  {
    field: 'Phone number',
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
