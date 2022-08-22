import React, { useState, useEffect } from 'react';
import { Link, useParams, useRouteMatch, useLocation, Route, Switch } from 'react-router-dom';
import { selectWeekByID } from '../../../../features/course/currentCourse/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseByID } from '../../../../features/course/currentCourse/courseAction';

import './Lecture.scss';

import { Layout, Menu, message } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, PlayCircleOutlined, ReadOutlined, ContainerOutlined } from '@ant-design/icons';
import LectureVideo from './LectureVideo/LectureVideo';
import LectureReading from './LectureReading/LectureReading';
import LectureQuiz from './LectureQuiz/LectureQuiz';


const Lecture = ({ history }) => {
    let { courseId } = useParams();
    let { url, path} = useRouteMatch();
    const user = useSelector(state => state.user.userObj);
    const courseRedux = useSelector(state => state.currentCourse.course);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const getCourse = async () => {
            
            let response = await dispatch(getCourseByID({courseId: courseId}));

            if(response?.error) {
                message.error({
                    content: response.payload.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                });

                history.push(`/search/course/${courseId}`);
            }
        }

        if(user && (courseRedux.id != courseId)) {
            console.log(courseRedux.id, " >< ", courseId);
            getCourse();
        }
    }, [user, courseId]);

    return (
        <div className="lecture">
            <Layout className="lecture-layout">
                <LectureSlide url={url} />
                <Layout className="lecture-layout-wrap-content">
                    <Layout.Content className="lecture-content" >
                        <Switch>
                            <Route path={`${path}/r/:contentId`}>
                                <LectureReading />
                            </Route>
                            <Route path={`${path}/v/:contentId`}>
                                <LectureVideo />
                            </Route>
                            <Route path={`${path}/q/:contentId`}>
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

const LectureSlide = ({ url }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [keySlide, setKeySlide] = useState(null);
    let { weekId } = useParams();
    const weekData = useSelector(state => selectWeekByID(state, weekId));
    const location = useLocation();

    // console.log("week data in lecture slide: ", weekData);
    console.log("location: ", location);
    console.log("url prop: ", url);

    useEffect(() => {
        let arr = location.pathname.split('/').filter(item => item !== "");
        console.log(arr)
        setKeySlide(`${arr[arr.length - 2]}-${arr[arr.length - 1]}`);

    }, [location.pathname]);
    
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
                    {weekData && weekData.contents.map(content => (
                        <React.Fragment key={content.id}>
                        {(content.contentStatus === "PUBLIC" && content.contentType === 'TEXT') && 
                            <Menu.Item className="lecture-menu-item" key={`r-${content.id}`} icon={<ReadOutlined className="icon"/>}>
                                <Link to={`${url}/r/${content.id}`}>
                                    <p className="item-title">
                                        <strong>Text: </strong> 
                                        {content.name}
                                    </p>
                                </Link>
                            </Menu.Item>
                        }
                        {(content.contentStatus === "PUBLIC" && content.contentType === 'VIDEO') && 
                            <Menu.Item className="lecture-menu-item" key={`v-${content.id}`} icon={<PlayCircleOutlined className="icon"/>}>
                                <Link to={`${url}/v/${content.id}`}>
                                    <p className="item-title">
                                        <strong>Video: </strong> 
                                        {content.name}
                                    </p>
                                </Link>
                            </Menu.Item>
                        }
                        {(content.contentStatus === "PUBLIC" && content.contentType === 'QUIZ') && 
                            <Menu.Item className="lecture-menu-item" key={`q-${content.id}`} icon={<ContainerOutlined className="icon"/>}>
                                <Link to={`${url}/q/${content.id}`}>
                                    <p className="item-title">
                                        <strong>Quiz: </strong> 
                                        {content.name}
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
