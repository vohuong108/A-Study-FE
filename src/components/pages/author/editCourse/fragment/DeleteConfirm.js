import React from 'react';
import './DeleteConfirm.scss';
import { Modal, Button  } from 'antd';
import { ExclamationCircleOutlined, DeleteFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectLectureByID } from '../../../../../features/course/currentCourse/courseSlice';
import { deleteLecture } from '../../../../../features/course/currentCourse/courseAction';
import { getToken } from '../../../../../utils/localStorageHandler';

const confirm = (weekId, lectureId, dispatch, lecRedux) => {
  console.log('in delete confirm: ', weekId, lectureId);

  Modal.confirm({
    title: "Do you want delete this lecture",
    icon: <ExclamationCircleOutlined />,
    content: 'Are you sure',
    onOk: async () => {
      let token = getToken();
      let requestData = {
        access_token: token,
        lectureId: lectureId,
        weekId: weekId,
        lectureType: lecRedux.lectureType
      }

      let result = await dispatch(deleteLecture(requestData));
    
    },
  })
}



const DeleteConfirm = ({ weekId, lectureId }) => {
  const dispatch = useDispatch();
  const lecRedux = useSelector(state => selectLectureByID(state, weekId, lectureId));

  return (
    <Button className="tb-btn del-btn" onClick={() => confirm(weekId, lectureId, dispatch, lecRedux)} icon={<DeleteFilled />}>
      Delete 
    </Button>
  );
};

export default DeleteConfirm