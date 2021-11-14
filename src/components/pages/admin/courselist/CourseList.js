import './courselist.scss'
import { DataGrid } from '@mui/x-data-grid';
import {DeleteForever} from '@mui/icons-material';
 import { courseRows } from '../data';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { get } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
 import axios from 'axios';
const final_base ="http://localhost:8888/api"
const APIuser='https://6190c079f6bf450017484cb1.mockapi.io/Userlist/userl';
export default function CourseList() {

  
  
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
        { field: 'Course', headerName: 'Course', width: 200
        ,renderCell: (params)=>{
            return (
                <div className="courseList">
                    <img className="courseImg" src={params.row.img} alt="" />
                    {params.row.Course}
                </div>
            )
        } 
      },
        { field: 'length', headerName: 'length', width: 200 },
        {
          field: 'author',
          headerName: 'author',
          width: 200,
        },
        {
          field: 'Price',
          headerName: 'Price',
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
                    <Link to={"/user/" + params.row.id}>
                    <button className="courseEdit">Edit</button>
                    </Link>
                    <DeleteForever className="courseDel"/>
                    </>
                )
            }
        }
      ];

    return (
        <div className="CourseList">
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
