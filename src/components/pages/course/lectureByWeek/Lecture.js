import React, { useState } from 'react'
import './Lecture.scss'
import 'antd/dist/antd.css'
import ReactPlayer from 'react-player'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlayCircleOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Header, Sider, Content } = Layout;

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
                        <h1 className="lecture-title">
                            Document retrieval: A case study in clustering and measuring similarity
                        </h1>

                        <div className="player-wrapper">
                            <ReactPlayer 
                                className="react-player" 
                                controls={true} 
                                url='https://www.youtube.com/watch?v=YDzv0GC1SfI' 
                                width='100%'
                                height='100%'
                            />
                        </div>
                        <div className="pedal"></div>

                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Lecture
