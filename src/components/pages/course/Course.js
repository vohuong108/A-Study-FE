import React, { useEffect, useState } from 'react'
import './Course.scss'
import 'antd/dist/antd.css'
import Supplement from './supplement/Supplement'
import { Route, Link, useLocation, useParams, Redirect, useRouteMatch, Switch } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Overview from './overview/Overview'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseByID } from '../../../features/course/currentCourse/courseAction'
import { unwrapResult } from '@reduxjs/toolkit'
import { getToken } from '../../../utils/localStorageHandler'

const Course = () => {
    let { id } = useParams();
    let { url, path } = useRouteMatch();
    let location = useLocation();
    const user = useSelector(state => state.user.userObj);
    const course = useSelector(state => state.currentCourse.course)
    const dispatch = useDispatch();
    
    console.log("loc: ", location);
    console.log("url: ", url);

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
    }, [user, id]);

    return (
        <div className="course">
            <Layout className="course-layout">
                <CourseSlide course={course}/>
                <Switch>
                    {location.pathname === url && <Redirect from={url} to={`${url}/welcome`} />}
                    <Route path={`${path}/welcome`}>
                        <Overview />
                    </Route>
                    <Route path={`${path}/week/:idWeek`} >
                        <Supplement permission={user?.permission}/>
                    </Route>
                    
                </Switch>
            </Layout>
        </div>
    )
}

const CourseSlide = ({ course }) => {
    const [keySlide, setKeySlide] = useState(null);
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
        <Layout.Sider className="course-left">
            <Menu
                mode="inline"
                selectedKeys={[keySlide]}
                style={{ height: '100%', borderRight: 0, fontSize: '16px', backgroundColor: '#F0F3F5'}}
            >
                <Menu.Item className="menu_item" key="overview">
                    <Link to={`${url}/welcome`}>Overview</Link>
                </Menu.Item>

                {course && course.weeks.map(week => (
                    <Menu.Item className="menu_item" key={`week${week.idWeek}`}>
                        <Link to={`${url}/week/${week.idWeek}`}>
                            {`Week ${week.idWeek}`}
                        </Link>  
                    </Menu.Item>
                ))}
            </Menu>
        </Layout.Sider>
    )
}

export default Course

