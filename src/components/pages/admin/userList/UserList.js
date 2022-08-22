import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import adminApi from '../../../../api/adminApi';
import qs from 'query-string';

import "./userlist.scss";

import { Table, Popconfirm, Select, message } from 'antd';


export default function User({ location, history }) {
    const [data, setData] = useState([]);
    const user = useSelector(state => state.user.userObj);

    console.log("location: ", location);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id
        }, {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Role',
            dataIndex: 'userRole',
            key: 'userRole',
            width: 180,
            render: (role, record) => <RoleEdit role={role} userId={record.id} setData={setData} location={location} />
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status, record) => <StatusEdit status={status} userId={record.id} setData={setData} location={location} />
        }
    ];

    useEffect(() => {
        let getAllUser = async ({ params }) => {
            try {
                let response = await adminApi.getAllUser({ params });
                setData(response?.data);

            } catch (err) {
                message.error({
                    content: err.response.data.message,
                    style: { marginTop: '72px' },
                    key: "enroll-msg"
                });
            }
        }

        if (user?.userRole === "SUPER_ADMIN" && location.search) {
            getAllUser({ params: qs.parse(location.search) });
        }
    }, [user, location.search])

    return (
        <div className="UserList">
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
            />
        </div>
    )
}

const RoleEdit = ({ role, userId, setData, location }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(role);

    const handleChange = (value) => {

        if (role !== value) {
            console.log("not match in role")
            setType(value);
            setVisible(true);

        }
    }

    const handleOk = async () => {
        try {
            let response = await adminApi.changeRoleOfUser({
                userId: userId,
                role: type
            });

            message.success({
                content: `The role of User id ${response.data.userId} changed to ${response.data.role}`,
                style: { marginTop: '72px' },
                key: "del-course-msg",
            })

            let responseAfterEdit = await adminApi.getAllUser({ params: qs.parse(location.search) });
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
            <Select value={role} style={{ width: 120 }} onChange={(value) => handleChange(value)} >
                <Select.Option value="STUDENT">STUDENT</Select.Option>
                <Select.Option value="AUTHOR">AUTHOR</Select.Option>
                <Select.Option value="ADMIN_TRAINEE">ADMIN_TRAINEE</Select.Option>
                <Select.Option value="SUPER_ADMIN">SUPER_ADMIN</Select.Option>
            </Select>
            <Popconfirm
                title="Do you want to change this user?"
                visible={visible}
                onConfirm={handleOk}
                okButtonProps={{ loading: loading }}
                onCancel={() => setVisible(false)}
            />
        </>

    )
}


const StatusEdit = ({ status, userId, setData, location }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(status);

    const handleChange = (value) => {
        if (status !== value) {
            setType(value);
            setVisible(true);
        }
    }

    const handleOk = async () => {
        try {
            let response = await adminApi.changeStatusOfUser({
                userId: userId,
                accountStatus: type
            });

            message.success({
                content: `The status of User id ${response.data.userId} changed to ${response.data.accountStatus}`,
                style: { marginTop: '72px' },
                key: "del-course-msg",
            })

            let responseAfterEdit = await adminApi.getAllUser({ params: qs.parse(location.search) });
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
            <Select value={status} style={{ width: 120 }} onChange={(value) => handleChange(value)}>
                <Select.Option value="ACTIVE">ACTIVE</Select.Option>
                <Select.Option value="INACTIVE">INACTIVE</Select.Option>
            </Select>
            <Popconfirm
                title="Do you want to change this user?"
                visible={visible}
                onConfirm={handleOk}
                okButtonProps={{ loading: loading }}
                onCancel={() => setVisible(false)}
            />
        </>
    )
}