import React from 'react'
import './Course.scss'
import 'antd/dist/antd.css';

import Supplement from './supplement/Supplement'
import { Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Overview from './overview/Overview';
const { Sider } = Layout;

const data = {
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

const Course = () => {
    let location = useLocation();

    const getKey = (path) => {
        let arr = path.split('/');

        if(arr[arr.length - 1] === 'welcome') return 'overview';
        else return `week${arr[arr.length - 1]}`
    }

    return (
        <div className="course">
            <Layout className="course-layout">
                <Sider className="course-left">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[getKey(location.pathname)]}
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

                <Route exact path="/course/welcome" >
                    <Overview />
                </Route>
                {data.weeks.map(id => (
                    <Route key={id} path={`/course/week/${id}`} >
                        <Supplement />
                    </Route>
                ))}
            </Layout>
        </div>
    )
}

export default Course

