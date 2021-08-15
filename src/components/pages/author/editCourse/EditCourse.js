import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import './EditCourse.scss'
import 'antd/dist/antd.css';
import { Layout, Collapse, Button, Row, Col, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import EditWeek from './editWeek/EditWeek'
import { getCourseByID, submitCourseChanges, } from '../../../../features/course/currentCourse/courseAction'
import { deleteCourseByID, } from '../../../../features/course/coursesAction'
import { addNewWeek } from '../../../../features/course/currentCourse/courseSlice'
import { getToken } from '../../../../utils/localStorageHandler'

const EditCourse = ({ idCourse, history }) => {
  console.log("ed his: ", history);
  let { id } = useParams();
  const user = useSelector(state => state.user.userObj);
  const data = useSelector(state => state.currentCourse.course);
  let loadingSubmit = useSelector(state => state.currentCourse.loadingSubmit);
  let loadingDel = useSelector(state => state.userCourses.loadingDel);
  
  const dispatch = useDispatch();


  const handleAddNewWeek = async () => {
    dispatch(addNewWeek());
  }

  const handleSubmitChanges = async () => {
    let token = getToken();

    let result = await dispatch(submitCourseChanges({
      access_token: token,
      data: data,
    }))

    let un_result = unwrapResult(result);
  }

  const handleDeleteCourse = async () => {
    let token = getToken();

    try {
      let result = await dispatch(deleteCourseByID({
        access_token: token,
        idCourse: id
      }));
      let un_result = unwrapResult(result);
      
      message.success({
        content: "Delete this course successfully",
        style: {marginTop: '72px'}
      })
    } catch (error) {
      message.error({
        content: error?.message,
        style: {marginTop: '72px'}
      })
    }
  }

  //get data by idCourse and save to editing course's redux store
  useEffect(() => {
    let token = getToken();

    const getCourse = async (requestData) => {
        let course = await dispatch(getCourseByID(requestData));
        let un_course = unwrapResult(course);
    }

    if(user && token) {
        let requestData = {
            access_token: token,
            idCourse: id
        }
        getCourse(requestData);
    }
  }, [id, user]);

  return (
      <div className="edit">
          <Layout className="edit-layout">
              <Layout.Content className="e-layout-content">
                <Row>
                  <Col span={24}>
                    <h3 className="edit-course-title">{data && data.name}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Collapse defaultActiveKey={['1']} className="collapse-wrap">
                      {data?.weeks?.map(week => (
                        <Collapse.Panel header={`Week ${week.idWeek}`} key={week.idWeek} className="panel-wrap">
                          <EditWeek idWeek={week.idWeek} />
                        </Collapse.Panel>
                      ))}
                    
                    </Collapse>
                  </Col>
                </Row>
                <Row className="last-row">
                  <Col className="last-row-col">
                    <Button 
                      shape="round" 
                      className="last-row-btn" 
                      danger
                      onClick={() => confirm(handleDeleteCourse, "Permanently delete the course!!!", "Are you sure?")}
                      loading={loadingDel}
                    >
                      Delete this course
                    </Button>
                  </Col>
                  <Col className="last-row-col">
                    <Button 
                      shape="round" 
                      className="last-row-btn" 
                      onClick={() => confirm(handleSubmitChanges, "Please save all week changes before submit!!!", "Do you want to submit?")}
                      loading={loadingSubmit}
                      >
                      Submit Changes
                    </Button>
                  </Col>
                  <Col className="last-row-col">
                    <Button shape="round" className="last-row-btn" onClick={() => handleAddNewWeek()}>
                      New Week
                    </Button>
                  </Col>
          
                </Row>
              </Layout.Content>
          </Layout>

      </div>
  )
}

const confirm = (handle, title, content) => {
  Modal.confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: content,
    width: '480px',
    onOk: () => {
      handle();
    },
  })
}


export default EditCourse
