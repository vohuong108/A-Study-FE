import React, { useEffect, useState } from 'react'
import './Course.scss'
import 'antd/dist/antd.css'
import Supplement from './supplement/Supplement'
import { Route, Link, useLocation, useParams, Redirect, useRouteMatch, Switch } from 'react-router-dom'
import { Layout, Menu, message } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import Overview from './overview/Overview'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseByID } from '../../../features/course/currentCourse/courseAction'
import { unwrapResult } from '@reduxjs/toolkit'
import { getToken } from '../../../utils/localStorageHandler'

const Course = ({ history, location }) => {
    let { id } = useParams();
    let { url, path } = useRouteMatch();
    const user = useSelector(state => state.user.userObj);
    const course = useSelector(state => state.currentCourse.course)
    const dispatch = useDispatch();
    
    console.log("location: ", location);
    console.log("url: ", url);

    useEffect(() => {
        let token = getToken();

        const getCourse = async (requestData) => {
            try {
                let course = await dispatch(getCourseByID(requestData));
                let un_course = unwrapResult(course);
    
                if(un_course?.isEnroll === false) history.push(`/search/course/${id}`);

            } catch(err) {
                message.error({
                    content: err.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                })
            }
        }

        if(user && token) {
            let requestData = {
                access_token: token,
                courseId: id
            }
            getCourse(requestData);
        }
    }, [user, id]);

    return (
        <div className="course">
            <Layout className="course-layout">
                <CourseSlide course={course}/>
                <Switch>
                    {/* {location.pathname === url && <Redirect from={url} to={`${url}/welcome`} />}
                    <Route path={`${path}/welcome`}>
                        <Overview />
                    </Route> */}
                    <Route path={`${path}/week/:weekId`} >
                        <Supplement permission={course?.permissionCourse}/>
                    </Route>
                    
                </Switch>
            </Layout>
        </div>
    )
}

const CourseSlide = ({ course }) => {
    const [keySlide, setKeySlide] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const { url } = useRouteMatch();

    useEffect(() => {
        let arr = location.pathname.split('/').filter(item => item !== "");
        
        if(arr[arr.length - 1] === 'welcome') {
            setKeySlide('overview');
        }
        else if(arr[arr.length - 2] === 'week') {
            setKeySlide(`week${arr[arr.length - 1]}`);
        }

    }, [location.pathname])

    return (
        <Layout.Sider 
            className="course-left"
            collapsedWidth={0} 
            collapsible 
            collapsed={collapsed} 
            onCollapse={() => setCollapsed(!collapsed)}
            trigger={<MenuOutlined className="course-trigger-slide" />}
        >
            <Menu
                mode="inline"
                selectedKeys={[keySlide]}
                style={{ height: '100%', borderRight: 0, fontSize: '16px', backgroundColor: '#F0F3F5'}}
            >
                {/* <Menu.Item className="menu_item" key="overview">
                    <Link to={`${url}/welcome`}>Overview</Link>
                </Menu.Item> */}

                {course && course.weeks.map(week => (
                    <Menu.Item className="menu_item" key={`week${week.weekId}`}>
                        <Link to={`${url}/week/${week.weekId}`}>
                            {`Week ${week.serialWeek}`}
                        </Link>  
                    </Menu.Item>
                ))}
            </Menu>
        </Layout.Sider>
    )
}

export default Course

