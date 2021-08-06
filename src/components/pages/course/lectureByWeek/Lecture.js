import React, { useState } from 'react'
import './Lecture.scss'
import 'antd/dist/antd.css'

import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlayCircleOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import LectureVideo from './LectureVideo/LectureVideo'
import LectureReading from './LectureReading/LectureReading'
import LectureQuiz from './LectureQuiz/LectureQuiz'

const { Sider, Content } = Layout;

const Lecture = () => {
    const [collapsed, setCollapsed] = useState(false)



    return (
        <div className="lecture">
            <Layout className="lecture-layout">
                <Sider 
                    className={`lecture-sidebar ${collapsed ? 'lecture-sidebar-collapsed' : ''}`}
                    trigger={null} 
                    collapsible 
                    collapsed={collapsed}
                >
                    <Menu className="lecture-menu" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item className="lecture-menu-item" key="1" icon={<ReadOutlined className="icon"/>}>
                            <Link to={'/course/welcome'}>
                                <p className="item-title">
                                    <strong>Reading: </strong> 
                                    Important Update regarding the Machine Learning Specialization
                                </p>
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="lecture-menu-item" key="2" icon={<PlayCircleOutlined className="icon"/>}>
                            <Link to={'/course/welcome'}>
                                <p className="item-title">
                                    <strong>Reading: </strong> 
                                    Important Update regarding the Machine Learning Specialization
                                </p>
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="lecture-menu-item" key="3" icon={<ReadOutlined className="icon"/>}>
                            <Link to={'/course/welcome'}>
                                <p className="item-title">
                                    <strong>Reading: </strong> 
                                    Important Update regarding the Machine Learning Specialization
                                </p>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <div className="lecture-layout-menu-toggle">
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => {setCollapsed(!collapsed)}
                    })}
                </div>
                <Layout className="lecture-layout-wrap-content">
                    <Content 
                        className="lecture-content"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <LectureReading />
                        <div className="pedal"></div>

                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Lecture
