import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './EditWeek.scss'
import 'antd/dist/antd.css';
import { Button, Table, Tag } from 'antd'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import { MenuOutlined } from '@ant-design/icons'
import arrayMove from 'array-move'
import DeleteConfirm from '../fragment/DeleteConfirm'
import AddLecture from '../fragment/AddLecture'
import EditWeekName from '../fragment/EditWeekName'
import EditLecture from '../fragment/EditLecture'
import { selectWeekByID, saveWeekChanges } from '../../../../../features/course/currentCourse/courseSlice'

const EditWeekContext = React.createContext();

const EditWeek = ({ weekId, courseId, weekOrder }) => {
  
  const weekStoreData = useSelector(state => selectWeekByID(state, weekId));
  const [weekData, setWeekData] = useState({ weekId: weekId, name: '', contents: [] });

  const columns = [
    {
      title: 'Lecture Name',
      dataIndex: 'name',
      className: 'drag-visible',
      width: 150,
      fixed: 'left',
    },
    {
      title: 'Type',
      dataIndex: 'contentType',
      render: (type) => <>{type}</> 
    },
    {
      title: 'Status',
      dataIndex: 'contentStatus',
      render: (status) => status === 'PUBLIC' ? <Tag color='cyan'>{status}</Tag> : <Tag color='#f50'>{status}</Tag>,
    },
    {
      title: 'Edit',
      render: (text) => <EditLecture data={{...text, courseId, weekId}}/>,
    },
    {
      title: 'Delete',
      render: (text) => <DeleteConfirm courseId={courseId} weekId={weekId} contentId={text.id}/>,
    },
  ];


  useEffect(() => {
    setWeekData({...weekData, ...weekStoreData});
  }, [weekStoreData])

  return (
    <>
    {weekData && 
      <div className="edit-week">
        <EditWeekContext.Provider value={{weekData, setWeekData}} >
          <EditWeekName title={weekData?.name} weekId={weekId} courseId={courseId}/>
          <Table
            className='edit-table'
            pagination={false}
            dataSource={weekData?.contents}
            columns={columns}
            rowKey="id"
            scroll={{ x: 1000}}
            // components={{
            //   body: {
            //     wrapper: DraggableContainer,
            //     row: DraggableBodyRow,
            //   },
            // }}
          />
          <div className="edit-week-btn">
            <div className="btn-wrap">
              <AddLecture weekId={weekData?.weekId}/>
            </div>
            {/* <div className="btn-wrap">
              <Button className="edit-btn-save" shape="round" type="primary" onClick={() => handleSaveChanges()}>
                Save Changes
              </Button>
            </div> */}
          </div>

        </EditWeekContext.Provider>
      </div>
    }
  </>
  )
}

export default EditWeek;
export { EditWeekContext };
