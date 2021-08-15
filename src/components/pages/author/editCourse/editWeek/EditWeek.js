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



const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible',
    render: () => <DragHandle />,
    fixed: 'left',
  },
  {
    title: 'Lecture Name',
    dataIndex: 'name',
    className: 'drag-visible',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => status === 'publish' ? <Tag color='cyan'>{status}</Tag> : <Tag color='#f50'>{status}</Tag>,
  },
  {
    title: 'Edit',
    render: (text) => <EditLecture data={text}/>,
  },
  {
    title: 'Delete',
    render: (text) => <DeleteConfirm idLecture={text.idLecture}/>,
  },
];

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const EditWeekContext = React.createContext();

const EditWeek = ({ idWeek }) => {
  const weekStoreData = useSelector(state => selectWeekByID(state, idWeek));
  const [weekData, setWeekData] = useState({ idWeek: idWeek, weekTitle: '', lectures: [] });
  const dispatch = useDispatch(saveWeekChanges(weekData));

  const onSortEnd = ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        const newData = arrayMove([].concat(weekData.lectures), oldIndex, newIndex).filter(el => !!el);
        console.log('Sorted items: ', newData);
        setWeekData({...weekData, lectures: newData});
      }
  };

  const DraggableContainer = props => (
      <SortableContainer
        useDragHandle
        disableAutoscroll
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
  );
  
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
      // function findIndex base on Table rowKey props and should always be a right array index
      const index = weekData.lectures.findIndex(x => x.idLecture === restProps['data-row-key']);
      return <SortableItem index={index} {...restProps} />;
  };

  const handleSaveChanges = () => {
    dispatch(saveWeekChanges(weekData))
  }

  useEffect(() => {
    setWeekData({...weekStoreData});
  }, [weekStoreData])

  return (
    <>
    {weekData && 
      <div className="edit-week">
        <EditWeekContext.Provider value={{weekData, setWeekData}}>
          <EditWeekName title={weekData.weekTitle}/>
          <Table
            className='edit-table'
            pagination={false}
            dataSource={weekData.lectures}
            columns={columns}
            rowKey="idLecture"
            scroll={{ x: 1000}}
            components={{
              body: {
                wrapper: DraggableContainer,
                row: DraggableBodyRow,
              },
            }}
          />
          <div className="edit-week-btn">
            <div className="btn-wrap">
              <AddLecture />
            </div>
            <div className="btn-wrap">
              <Button className="edit-btn-save" shape="round" type="primary" onClick={() => handleSaveChanges()}>
                Save Changes
              </Button>
            </div>
          </div>

        </EditWeekContext.Provider>
      </div>
    }
  </>
  )
}

export default EditWeek;
export { EditWeekContext };
