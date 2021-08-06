import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './EditCourse.scss'
import 'antd/dist/antd.css';
import { Layout, Collapse, Button, Row, Col } from 'antd'
import EditWeek from './editWeek/EditWeek'
import { selectEditingCourse } from '../../../../features/course/editCourse/editCourseSlice'


const EditCourse = ({ idCourse }) => {
  //get data by idCourse and save to editing course's redux store
  const data = useSelector(selectEditingCourse);

  return (
      <div className="edit">
          <Layout className="edit-layout">
              <Layout.Content className="e-layout-content">
                <Row>
                  <Col span={24}>
                    <Collapse defaultActiveKey={['1']} className="collapse-wrap">
                      {data && data.weeks.map(week => (
                        <Collapse.Panel header={`Week ${week.idWeek}`} key={week.idWeek} className="panel-wrap">
                          <EditWeek idWeek={week.idWeek} />
                        </Collapse.Panel>
                      ))}
                    
                    </Collapse>
                  </Col>
                </Row>
                <Row>
                  <Col span={2}>
                    <Button>Delete this course</Button>
                  </Col>
                  <Col span={2}>
                    <Button>Add new week</Button>
                  </Col>
                </Row>
              </Layout.Content>
          </Layout>

      </div>
  )
}

export default EditCourse
