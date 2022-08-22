import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWeekContent } from '../../../../../features/course/currentCourse/courseAction';

import './DeleteConfirm.scss';

import { Modal, Button  } from 'antd';
import { ExclamationCircleOutlined, DeleteFilled } from '@ant-design/icons';



const confirm = (courseId, weekId, contentId, dispatch) => {
  console.log("[DeleteConfirm] input: ", courseId, weekId, contentId)
  Modal.confirm({
    title: "Do you want delete this content",
    icon: <ExclamationCircleOutlined />,
    content: 'Are you sure',
    onOk: async () => {
      await dispatch(deleteWeekContent({ courseId, weekId, contentId}));
    },
  })
}



const DeleteConfirm = ({ courseId, weekId, contentId }) => {
  const dispatch = useDispatch();

  return (
    <Button 
      className="tb-btn del-btn" 
      onClick={() => confirm(courseId, weekId, contentId, dispatch)} 
      icon={<DeleteFilled />}
    >
      Delete 
    </Button>
  );
};

export default DeleteConfirm