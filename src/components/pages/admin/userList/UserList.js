import React, { useState, useEffect } from 'react';
import "./userlist.scss";
import { Table, Popconfirm, Button, Select } from 'antd';
import { getToken } from '../../../../utils/localStorageHandler';
import axios from 'axios';

const final_base ="http://localhost:8888/api";

export default function User() {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        { 
            title: 'ID',
            dataIndex: 'userId',
            key: 'userId',
            width: 100,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.userId - b.userId
        },{ 
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },{
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },{
            title: 'Role',
            dataIndex: 'userRole',
            key: 'userRole',
            width: 120,
            render: (role, record) => <RoleEdit role={role} userId={record.userId} setData={setData}/>
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status, record) => <StatusEdit status={status} userId={record.userId} setData={setData} />
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setSelectedRowKeys([...selectedRowKeys]);
        },
    };

    useEffect(() => {
        let access_token = getToken();

        let getAllUser = async () => {
            let response = await axios({
                url: `${final_base}/users/admin`,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            console.log("response in get all users admin: ", response.data);
            setData(response?.data);
        }

        if(access_token) {
            getAllUser();
        }
    }, [])

    return (
        <div className="UserList">
            <Table 
                // rowSelection={{
                //     type: "checkbox",
                //     ...rowSelection,
                // }}
                columns={columns} 
                dataSource={data} 
                rowKey="userId"
            />
            {/* <DeleteAll setData={setData} listUserId={selectedRowKeys} /> */}
        </div>
    )
}

const DeleteAll = ({ setData, listUserId }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleDeleteAll = async () => {
        let access_token = getToken();

        try {
            let response = await axios({
                url: `${final_base}/user/deletes`,
                method: 'delete',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
                data: {ids: listUserId}
            });

            let responseAfter = await axios({
                url: `${final_base}/users/admin`,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            console.log("response in get all after delete many user admin: ", responseAfter.data);
            setData(responseAfter?.data);

            setLoading(false);
            setVisible(false);
        } catch (error) {
            setLoading(false);
            setVisible(false);
        }
    }

    return(
        <>
        <Button type="primary" onClick={() => setVisible(true)} disabled={!(listUserId.length > 1)}>
            Delete All
        </Button>
        <Popconfirm
            title="Do you want to delete all these users?"
            visible={visible}
            onConfirm={handleDeleteAll}
            okButtonProps={{ loading: loading }}
            onCancel={() => setVisible(false)}
        />
        </>
    )
    
}

const RoleEdit = ({ role, userId, setData }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(role);

    const handleChange = (value) => {

        if(role !== value) {
            console.log("not match in role")
            setType(value);
            setVisible(true);

        }
    }

    const handleOk = async () => {
        let access_token = getToken();

        try {
            let response = await axios({
                url: `${final_base}/user/changerole/${userId}/${type}`,
                method: 'put',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            let responseAfter = await axios({
                url: `${final_base}/users/admin`,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            console.log("response in get all after delete user admin: ", responseAfter.data);
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
        <Select value={role} style={{ width: 120 }} onChange={(value) => handleChange(value)} >
            <Select.Option value="STUDENT">STUDENT</Select.Option>
            <Select.Option value="AUTHOR">AUTHOR</Select.Option>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
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


const StatusEdit = ({ status, userId, setData }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(status);

    const handleChange = (value) => {
        if(status !== value) {
            console.log("not match in status type");
            setType(value);
            setVisible(true);
        }
    }

    const handleOk = async () => {
        let access_token = getToken();

        try {
            let response = await axios({
                url: `${final_base}/user/changestatus/${userId}/${type}`,
                method: 'put',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            let responseAfter = await axios({
                url: `${final_base}/users/admin`,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            console.log("response in get all after delete user admin: ", responseAfter.data);
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