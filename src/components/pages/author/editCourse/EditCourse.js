import React, { useEffect } from 'react'
import './EditCourse.scss'
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { Layout, Collapse, Button, Row, Col, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import EditWeek from './editWeek/EditWeek'
import { getCourseByID, submitCourseChanges, addWeek} from '../../../../features/course/currentCourse/courseAction'
import { deleteCourseByID } from '../../../../features/course/coursesAction'
import { getToken } from '../../../../utils/localStorageHandler'

const EditCourse = ({ history }) => {
  console.log("ed his: ", history);
  let { id } = useParams();
  const user = useSelector(state => state.user.userObj);
  const data = useSelector(state => state.currentCourse.course);
  let loadingSubmit = useSelector(state => state.currentCourse.loadingSubmit);
  let loadingDel = useSelector(state => state.userCourses.loadingDel);
  
  const dispatch = useDispatch();

  const handleAddNewWeek = async () => {
    let token = getToken();
    let requestData = {
      access_token: token,
      data: { courseId: parseInt(id), serialWeek: data?.weeks.length + 1, name: "Please type week name"}
    }

    await dispatch(addWeek(requestData));
  }

  const handleSubmitChanges = async () => {
    let token = getToken();

    try {
      let result = await dispatch(submitCourseChanges({ access_token: token, data: data }))

      message.success({
        content: "Submit changes successfully",
        style: {marginTop: '72px'},
        key: "submit-course-msg",
      })

      

    } catch(error) {
      message.error({
        content: error?.message,
        style: {marginTop: '72px'},
        key: "submit-course-msg",
      })
    }

  }

  const handleDeleteCourse = async () => {
    let token = getToken();

    try {
      let result = await dispatch(deleteCourseByID({ access_token: token, courseId: id }));
      
      message.success({
        content: "Delete this course successfully",
        style: {marginTop: '72px'},
        key: "del-course-msg",
      })

      history.push("/dashbroad");
    } catch (error) {
      message.error({
        content: error?.message,
        style: {marginTop: '72px'},
        key: "del-course-msg",
      })
      
    }
  }

  //get data by idCourse and save to editing course's redux store
  useEffect(() => {
    let token = getToken();

    const getCourse = async (requestData) => {
      try {
        let course = await dispatch(getCourseByID(requestData));
        let un_course = unwrapResult(course);

        if(un_course?.isEnroll === false) history.push(`/search/course/${id}`)
      } catch (err) {
        message.error({
          content: err.message,
          style: {marginTop: '72px'},
          key: "enroll-msg"
        })
      }
    }

    if(user && token) {
        let requestData = { access_token: token, courseId: id };

        getCourse(requestData);
    }
  }, [id, user]);

  return (
      <div className="edit">
        {(user?.permission === 'AUTHOR' || user?.permission === 'ADMIN') &&
          <Layout className="edit-layout">
              <Layout.Content className="e-layout-content">
                <Row>
                  <Col span={24}>
                    <h3 className="edit-course-title">{data?.name}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                  {/* defaultActiveKey={['1']} */}
                    <Collapse className="collapse-wrap" >
                      {data?.weeks?.map(week => (
                        <Collapse.Panel header={`Week ${week.serialWeek}`} key={week.serialWeek} className="panel-wrap">
                          <EditWeek weekId={week.weekId} courseId={id} serialWeek={week.serialWeek}/>
                        </Collapse.Panel>
                      ))}
                    
                    </Collapse>
                  </Col>
                </Row>
                <Row className="last-row" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, {xs: 8}]}>
                  <Col className="last-row-col" xs={24} sm={8}>
                    <Button 
                      shape="round" 
                      className="last-row-btn" 
                      danger
                      disabled={!data}
                      onClick={() => confirm(handleDeleteCourse, "Permanently delete the course!!!", "Are you sure?")}
                      loading={loadingDel}
                    >
                      Delete this course
                    </Button>
                  </Col>
                  {/* <Col className="last-row-col" xs={24} sm={8} >
                    <Button 
                      shape="round" 
                      className="last-row-btn"
                      disabled={!data} 
                      onClick={() => confirm(handleSubmitChanges, "Please save all week changes before submit!!!", "Do you want to submit?")}
                      loading={loadingSubmit}
                      >
                      Submit Changes
                    </Button>
                  </Col> */}
                  <Col className="last-row-col" xs={24} sm={8} >
                    <Button 
                      shape="round" 
                      className="last-row-btn" 
                      disabled={!data} 
                      onClick={() => handleAddNewWeek()}
                    >
                      New Week
                    </Button>
                  </Col>
          
                </Row>
                <div className="pedal"></div>
              </Layout.Content>
          </Layout>
        }

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
