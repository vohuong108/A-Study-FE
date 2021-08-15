import React, { useState, useEffect } from 'react'
import './Lecture.scss'
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, PlayCircleOutlined, ReadOutlined, ContainerOutlined } from '@ant-design/icons'
import { Link, useParams, useRouteMatch, useLocation, Route, Switch } from 'react-router-dom'
import LectureVideo from './LectureVideo/LectureVideo'
import LectureReading from './LectureReading/LectureReading'
import LectureQuiz from './LectureQuiz/LectureQuiz'
import { getLearnCourseByID } from '../../../../features/course/currentCourse/courseAction'
import { selectWeekByID } from '../../../../features/course/currentCourse/courseSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { getToken } from '../../../../utils/localStorageHandler'
import { useDispatch, useSelector } from 'react-redux'


const Lecture = () => {
    let { idCourse, idWeek } = useParams();
    let { url, path} = useRouteMatch();
    const user = useSelector(state => state.user.userObj);
    const week = useSelector(state => selectWeekByID(state, idWeek));
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("run in get course in lecture.js, id: ", idCourse);
        let token = getToken();

        const getCourse = async (requestData) => {
            let course = await dispatch(getLearnCourseByID(requestData));
        }

        if(user && token) {
            let requestData = {
                access_token: token,
                idCourse: idCourse
            }
            getCourse(requestData);
        }
    }, [user, idCourse]);

    return (
        <div className="lecture">
            <Layout className="lecture-layout">
                <LectureSlide week={week} url={url} />
                <Layout className="lecture-layout-wrap-content">
                    <Layout.Content 
                        className="lecture-content"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path={`${path}/r/:idLecture`}>
                                <LectureReading />
                            </Route>
                            <Route path={`${path}/v/:idLecture`}>
                                <LectureVideo />
                            </Route>
                            <Route path={`${path}/q/:idLecture`}>
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
            >
                <Menu className="lecture-menu" mode="inline" selectedKeys={[keySlide]}>
                    {week && week.lectures.map(lecture => (
                        <React.Fragment key={lecture.idLecture}>
                        {lecture.type === 'reading' && 
                            <Menu.Item className="lecture-menu-item" key={`r-${lecture.idLecture}`} icon={<ReadOutlined className="icon"/>}>
                                <Link to={`${url}/r/${lecture.idLecture}`}>
                                    <p className="item-title">
                                        <strong>Reading: </strong> 
                                        {lecture.name}
                                    </p>
                                </Link>
                            </Menu.Item>
                        }
                        {lecture.type === 'video' && 
                            <Menu.Item className="lecture-menu-item" key={`v-${lecture.idLecture}`} icon={<PlayCircleOutlined className="icon"/>}>
                                <Link to={`${url}/v/${lecture.idLecture}`}>
                                    <p className="item-title">
                                        <strong>Video: </strong> 
                                        {lecture.name}
                                    </p>
                                </Link>
                            </Menu.Item>
                        }
                        {lecture.type === 'quiz' && 
                            <Menu.Item className="lecture-menu-item" key={`q-${lecture.idLecture}`} icon={<ContainerOutlined className="icon"/>}>
                                <Link to={`${url}/q/${lecture.idLecture}`}>
                                    <p className="item-title">
                                        <strong>Quiz: </strong> 
                                        {lecture.name}
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
