import React, { useContext } from 'react'
import './DeleteConfirm.scss'
import { Modal, Button  } from 'antd'
import { ExclamationCircleOutlined, DeleteFilled } from '@ant-design/icons'
import { EditWeekContext } from '../editWeek/EditWeek'

const confirm = (weekContext, idLecture) => {
  console.log('in confirm: ', weekContext, idLecture);

  Modal.confirm({
    title: "Do you want delete this lecture",
    icon: <ExclamationCircleOutlined />,
    content: 'Are you sure',
    onOk: () => {
      console.log('close: ')
      let lectures = weekContext.weekData.lectures;
      let newLectures = [];

      for(let i=0; i<lectures.length; i++) {
        if(lectures[i].idLecture > idLecture ) {
          newLectures.push({...lectures[i], idLecture: lectures[i].idLecture - 1});
        } else if (lectures[i].idLecture < idLecture ) {
          newLectures.push({...lectures[i]});
        }
      }
      console.log('new: ', newLectures);
      
      weekContext.setWeekData({
        ...weekContext.weekData,
        lectures: [...newLectures]
      })
    },
  })
}



const DeleteConfirm = ({ idLecture }) => {
  const weekContext = useContext(EditWeekContext)
  return (
    <Button className="tb-btn del-btn" onClick={() => confirm(weekContext, idLecture)} icon={<DeleteFilled />}>
      Delete 
    </Button>
  );
};

export default DeleteConfirm