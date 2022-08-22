import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseByID } from '../../../features/course/currentCourse/courseAction';
import { Route, Link, useLocation, useParams, Redirect, useRouteMatch, Switch } from 'react-router-dom';

import './Course.scss';

import Supplement from './supplement/Supplement';
// import Overview from './overview/Overview';
import { Layout, Menu, message } from 'antd';
import { MenuOutlined } from '@ant-design/icons';



const Course = ({ history, location }) => {
    let { id } = useParams();
    let { url, path } = useRouteMatch();
    const user = useSelector(state => state.user.userObj);
    const course = useSelector(state => state.currentCourse.course)
    const dispatch = useDispatch();

    useEffect(() => {
        const getCourse = async () => {
            
                let response = await dispatch(getCourseByID({courseId: id}));
            
                if(response?.error) {
                    message.error({
                        content: response.payload.message,
                        style: {marginTop: '72px'},
                        key: "enroll-msg"
                    });
    
                    history.push(`/search/course/${id}`);
                }
        }

        if(user) {
            getCourse();
        }
    }, [user, id]);

    return (
        <div className="course">
            <Layout className="course-layout">
                <CourseSlide course={course}/>
                <Switch>
                    {(location.pathname === url && course?.weeks?.length > 0) && <Redirect from={url} to={`${url}/week/${course.weeks[0].id}`} />}
                    {/* <Route path={`${path}/welcome`}>
                        <Overview />
                    </Route> */}
                    <Route path={`${path}/week/:weekId`} >
                        <Supplement />
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
        
        if(arr[arr.length - 2] === 'week') {
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
                    <Menu.Item className="menu_item" key={`week${week.id}`}>
                        <Link to={`${url}/week/${week.id}`}>
                            {`Week ${week.weekOrder}`}
                        </Link>  
                    </Menu.Item>
                ))}
            </Menu>
        </Layout.Sider>
    )
}

export default Course

