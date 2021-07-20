import React from 'react'
import './Course.scss'
import 'antd/dist/antd.css';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Overview from './overview/Overview';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const Course = () => {
    return (
        <div className="course">
            <div className="course-container">
                <div className="course-row">
                    <Layout>
                        <Sider width={280} className="course-left">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['overview']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0, fontSize: '16px', backgroundColor: '#F0F3F5'}}
                            >
                                <Menu.Item className="menu_item" key="overview">Overview</Menu.Item>
                                <Menu.Item className="menu_item" key="week1">Week 1</Menu.Item>
                                <Menu.Item className="menu_item" key="week2">Week 2</Menu.Item>
                                <Menu.Item className="menu_item" key="week3">Week 3</Menu.Item>
                                <Menu.Item className="menu_item" key="week4">Week 4</Menu.Item>
                                <Menu.Item className="menu_item" key="week5">Week 5</Menu.Item>
                                <Menu.Item className="menu_item" key="week6">Week 6</Menu.Item>
                                <Menu.Item className="menu_item" key="week7">Week 7</Menu.Item>
                                <Menu.Item className="menu_item" key="week8">Week 8</Menu.Item>
                                <Menu.Item className="menu_item" key="week9">Week 9</Menu.Item>
                            </Menu>
                        </Sider>
                        
                        <Overview />
                    </Layout>
                    
                </div>
            </div>
        </div>
    )
}

export default Course
