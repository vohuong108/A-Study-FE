import React from 'react'
import './Course.scss'
import 'antd/dist/antd.css';

import Lecture from './lectureByWeek/Lecture'
import { Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Overview from './overview/Overview';
const { Sider } = Layout;

const data = {
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

const Course = () => {
    return (
        <div className="course">
            <Layout className="course-layout">
                <Sider className="course-left">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['overview']}
                        style={{ height: '100%', borderRight: 0, fontSize: '16px', backgroundColor: '#F0F3F5'}}
                    >
                        <Menu.Item className="menu_item" key="overview">
                            <Link to={'/course/welcome'}>Overview</Link>
                        </Menu.Item>

                        {data.weeks.map(id => (
                            <Menu.Item className="menu_item" key={`week${id}`}>
                                <Link to={`/course/week/${id}`}>
                                    {`Week ${id}`}
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>

                <Route path="/course/welcome" >
                    <Overview />
                </Route>
                {data.weeks.map(id => (
                    <Route key={id} path={`/course/week/${id}`} >
                        <Lecture />
                    </Route>
                ))}
            </Layout>
        </div>
    )
}

export default Course
