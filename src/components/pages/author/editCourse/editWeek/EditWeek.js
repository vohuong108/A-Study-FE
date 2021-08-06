import React, { useState } from 'react'
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
import { selectWeekByID } from '../../../../../features/course/editCourse/editCourseSlice'

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
    fixed: 'left'
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (text) => <Tag color='cyan'>{text}</Tag>,
  },
  {
    title: 'Edit',
    render: (text) => <EditLecture data={text}/>,
  },
  {
    title: 'Delete',
    render: () => <DeleteConfirm />,
  },
];

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const EditWeekContext = React.createContext();

const EditWeek = ({ idWeek }) => {
  const [diableBtn, setDisableBtn] = useState(true);
  const weekStoreData = useSelector(state => selectWeekByID(state, idWeek));
  const [weekData, setWeekData] = useState(weekStoreData);

  const onSortEnd = ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        const newData = arrayMove([].concat(weekData.lectures), oldIndex, newIndex).filter(el => !!el);
        console.log('Sorted items: ', newData);
        setWeekData({...weekData, lectures: newData});
        setDisableBtn(false);
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

  return (
    <>
    {weekData && 
      <div className="edit-week">
        <EditWeekName title={weekData.weekTitle}/>
        <EditWeekContext.Provider value={{weekData, setWeekData}}>
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
              <Button className="edit-btn-save" shape="round" type="primary" disabled={diableBtn}>
                Submit Changes
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
