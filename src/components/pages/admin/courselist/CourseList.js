import './courselist.scss'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../../../utils/localStorageHandler';
import { Table, Popconfirm, Button } from 'antd';


const final_base ="http://localhost:8888/api"


export default function CourseList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        let access_token = getToken();

        let getAllCourse = async () => {
            let response = await axios({
                url: `${final_base}/courses/admin`,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            console.log("response in get all course admin: ", response.data);
            setData(response?.data);
        }

        if(access_token) {
            getAllCourse();
        }
    }, [])

    const columns = [
        { 
            title: 'ID',
            dataIndex: 'courseId',
            key: 'courseId',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.courseId - b.courseId
        },{ 
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },{
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },{
            title: 'Release',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
        }, {
            title: 'Action',
            dataIndex: 'courseId',
            render: (courseId) => <DeleteCourse courseId={courseId} setData={setData}/>
        }
    ];

    return (
        <div className="CourseList">
            <Table 
                columns={columns} 
                dataSource={data} 
            />
        </div>
    )
}
  
const DeleteCourse = ({ courseId, setData }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        let access_token = getToken();

        try {
            let response = await axios({
                url: `${final_base}/course/delete/${courseId}`,
                method: 'delete',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            let responseAfter = await axios({
                url: `${final_base}/courses/admin`,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            console.log("response in get all after delete course admin: ", responseAfter.data);
            setData(responseAfter?.data);

            setLoading(false);
            setVisible(false);
        } catch (error) {
            setLoading(false);
            setVisible(false);
        }
    }

    return (
        <>
        <Button className="tb-btn del-btn" onClick={() => {setVisible(true);}}>
            Delete 
        </Button>
        <Popconfirm
            title="Do you want to delete this course?"
            visible={visible}
            onConfirm={handleOk}
            okButtonProps={{ loading: loading }}
            onCancel={() => setVisible(false)}
        />
        </>
    );
};
