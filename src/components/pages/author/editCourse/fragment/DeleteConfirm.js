import React, { useState } from 'react'
import { Modal, Button  } from 'antd'
import { ExclamationCircleOutlined, DeleteFilled } from '@ant-design/icons';
import './DeleteConfirm.scss'

const confirm = () => {
  Modal.confirm({
    title: "Do you want delete this lecture",
    icon: <ExclamationCircleOutlined />,
    content: 'Are you sure',
    onOk: () => {
      console.log('close: ')
    },
  })
}



const DeleteConfirm = () => {
  return (
    <Button className="tb-btn del-btn" onClick={confirm} icon={<DeleteFilled />}>
      Delete 
    </Button>
  );
};

export default DeleteConfirm