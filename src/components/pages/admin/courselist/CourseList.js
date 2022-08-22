import { useState, useEffect } from 'react';
import adminApi from '../../../../api/adminApi';
import { useSelector } from 'react-redux';
import moment from 'moment';
import qs from 'query-string';

import './courselist.scss';

import { Table, Popconfirm, Button, message } from 'antd';


export default function CourseList({ location, history }) {
    const [data, setData] = useState([]);
    const user = useSelector(state => state.user.userObj);

    useEffect(() => {
        let getAllCourse = async ({ params }) => {
            try {
                let response = await adminApi.getAllCourse({ params });
                setData(response?.data);
            } catch (err) {
                message.error({
                    content: err.response.message,
                    style: { marginTop: '72px' },
                    key: "enroll-msg"
                });
            }
        }

        if (user?.userRole === "SUPER_ADMIN" && location.search) {
            getAllCourse({ params: qs.parse(location.search) });
        }
    }, [user, location.search])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id
        }, {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        }, {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        }, {
            title: 'Release',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
            render: (str) => <>{moment.utc(str).local().format("HH:mm:ss, DD-MM-yyyy")}</>
        }, {
            title: 'Action',
            dataIndex: 'id',
            render: (id) => <DeleteCourse courseId={id} setData={setData} location={location} />
        }
    ];

    return (
        <div className="CourseList">
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
            />
        </div>
    )
}

const DeleteCourse = ({ courseId, setData, location }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        try {
            let response = await adminApi.deleteCourse({ courseId });

            message.success({
                content: response.data,
                style: { marginTop: '72px' },
                key: "del-course-msg",
            })

            let responseAfterEdit = await adminApi.getAllCourse({ params: qs.parse(location.search) });
            setData(responseAfterEdit?.data);

        } catch (err) {
            message.error({
                content: err.response.data.message,
                style: { marginTop: '72px' },
                key: "enroll-msg"
            });
        }

        setLoading(false);
        setVisible(false);
    }

    return (
        <>
            <Button className="tb-btn del-btn" onClick={() => { setVisible(true); }}>
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
