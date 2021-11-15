import React, { useState, useEffect } from 'react'
import './Lecture.scss'
import 'antd/dist/antd.css'
import { Layout, Menu, message } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, PlayCircleOutlined, ReadOutlined, ContainerOutlined } from '@ant-design/icons'
import { Link, useParams, useRouteMatch, useLocation, Route, Switch } from 'react-router-dom'
import LectureVideo from './LectureVideo/LectureVideo'
import LectureReading from './LectureReading/LectureReading'
import LectureQuiz from './LectureQuiz/LectureQuiz'
import { selectWeekByID } from '../../../../features/course/currentCourse/courseSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { getToken } from '../../../../utils/localStorageHandler'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseByID } from '../../../../features/course/currentCourse/courseAction'


const Lecture = ({ history }) => {
    let { courseId, weekId } = useParams();
    let { url, path} = useRouteMatch();
    const user = useSelector(state => state.user.userObj);
    const week = useSelector(state => selectWeekByID(state, weekId));
    const dispatch = useDispatch();

    useEffect(() => {
        let token = getToken();

        const getCourse = async (requestData) => {
            try {
                let course = await dispatch(getCourseByID(requestData));
                let un_course = unwrapResult(course);

                if(un_course?.isEnroll === false) history.push(`/search/course/${courseId}`);

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
                courseId: courseId
            }
            getCourse(requestData);
        }
    }, [user, courseId]);

    return (
        <div className="lecture">
            <Layout className="lecture-layout">
                <LectureSlide week={week} url={url} />
                <Layout className="lecture-layout-wrap-content">
                    <Layout.Content className="lecture-content" >
                        <Switch>
                            <Route path={`${path}/r/:lectureId`}>
                                <LectureReading />
                            </Route>
                            <Route path={`${path}/v/:lectureId`}>
                                <LectureVideo />
                            </Route>
                            <Route path={`${path}/q/:lectureId`}>
                                <LectureQuiz />
                            </Route>
                        </Switch>
                        <div className="pedal"></div>

                    </Layout.Content>
                </Layout>
            </Layout>
        </div>
    )
}

const LectureSlide = ({ week, url }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [keySlide, setKeySlide] = useState(null);
    const location = useLocation();

    console.log("week data in lecture slide: ", week);

    useEffect(() => {
        let arr = location.pathname.split('/').filter(item => item !== "");
        setKeySlide(`${arr[arr.length - 2]}${arr[arr.length - 1]}`);     

    }, [location.pathname])
    
    return (
        <>
            <Layout.Sider 
                className={`lecture-sidebar ${collapsed ? 'lecture-sidebar-collapsed' : ''}`}
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                collapsedWidth={0}
            >
                <Menu className="lecture-menu" mode="inline" selectedKeys={[keySlide]}>
                    {week && week.lectures.map(lecture => (
                        <React.Fragment key={lecture.lectureId}>
                        {lecture.lectureType === 'TEXT' && 
                            <Menu.Item className="lecture-menu-item" key={`r-${lecture.lectureId}`} icon={<ReadOutlined className="icon"/>}>
                                <Link to={`${url}/r/${lecture.lectureId}`}>
                                    <p className="item-title">
                                        <strong>Text: </strong> 
                                        {lecture.title}
                                    </p>
                                </Link>
                            </Menu.Item>
                        }
                        {lecture.lectureType === 'VIDEO' && 
                            <Menu.Item className="lecture-menu-item" key={`v-${lecture.lectureId}`} icon={<PlayCircleOutlined className="icon"/>}>
                                <Link to={`${url}/v/${lecture.lectureId}`}>
                                    <p className="item-title">
                                        <strong>Video: </strong> 
                                        {lecture.title}
                                    </p>
                                </Link>
                            </Menu.Item>
                        }
                        {lecture.lectureType === 'QUIZ' && 
                            <Menu.Item className="lecture-menu-item" key={`q-${lecture.lectureId}`} icon={<ContainerOutlined className="icon"/>}>
                                <Link to={`${url}/q/${lecture.lectureId}`}>
                                    <p className="item-title">
                                        <strong>Quiz: </strong> 
                                        {lecture.title}
                                    </p>
                                </Link>
                            </Menu.Item>
                        }
                        </React.Fragment>
                    ))}
                </Menu>
            </Layout.Sider>
            <div className="lecture-layout-menu-toggle">
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => {setCollapsed(!collapsed)}
                })}
            </div>
        </>
    )
}

export default Lecture
