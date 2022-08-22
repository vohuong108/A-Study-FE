import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
    getCourseByID,
    createWeek, 
    deleteCourseByID} from '../../../../features/course/currentCourse/courseAction';

import './EditCourse.scss';

import { Layout, Collapse, Button, Row, Col, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditWeek from './editWeek/EditWeek';


const EditCourse = ({ history, location }) => {
    
    let { id } = useParams();
    const user = useSelector(state => state.user.userObj);
    const data = useSelector(state => state.currentCourse.course);
    let loadingDel = useSelector(state => state.userCourses.loadingDel);
    
    const dispatch = useDispatch();

    const handleAddNewWeek = async () => {
    
    let requestData = {
        courseId: parseInt(id),
        data: { weekOrder: data?.weeks.length + 1, name: "Please type week name"}
    }

    await dispatch(createWeek(requestData));
  }


  const handleDeleteCourse = async () => {
    
        let result = await dispatch(deleteCourseByID({ courseId: id }));
        
        if(result?.error) {
            message.error({
                content: result.payload.message,
                style: {marginTop: '72px'},
                key: "del-course-msg",
            })
        } else {
            message.success({
                content: result.payload.message,
                style: {marginTop: '72px'},
                key: "del-course-msg",
            })
            history.push("/dashbroad");
        }

  }

  //get data by idCourse and save to editing course's redux store
  useEffect(() => {

    const getCourse = async (requestData) => {
      
        let result = await dispatch(getCourseByID(requestData));
        
        // if(un_course?.isEnroll === false) history.push(`/search/course/${id}`);
      
        if(result?.error) {
            message.error({
                content: result.payload.message,
                style: {marginTop: '72px'},
                key: "enroll-msg"
            })

            if(location.state) history.push(location.state.from.pathname);
            else history.push('/dashbroad');
        }
    }

    if(user) {
        getCourse({courseId: id});
    }
  }, [id, user]);

  return (
      <div className="edit">
        {(user?.userRole === 'AUTHOR' || user?.userRole === 'SUPER_ADMIN') &&
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
                        <Collapse.Panel header={`Week ${week.weekOrder}`} key={week.weekOrder} className="panel-wrap">
                          <EditWeek weekId={week.id} courseId={id} weekOrder={week.weekOrder}/>
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
