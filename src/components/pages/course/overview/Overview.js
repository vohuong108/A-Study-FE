import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import './Overview.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseOverview } from '../../../../features/course/currentCourse/courseAction'
import { getToken } from '../../../../utils/localStorageHandler'
import OverviewWeek from './OverviewWeek';
import { Layout, Collapse  } from 'antd';
import { useParams } from 'react-router-dom'

const Overview = () => {
    const { id } = useParams();
    const user = useSelector(state => state.user.userObj);
    const dispatch = useDispatch();
    const overview = useSelector(state => state.currentCourse.overview);
    
    useEffect(() => {
        let token = getToken();

        let getOverview = async (data) => {
            let result = await dispatch(getCourseOverview(data))
        }

        if(user && token) {
            let data = {
                access_token: token,
                idCourse: id
            }

            getOverview(data);
        }
    }, [user, id])
    return (
        <Layout className="overview" style={{ backgroundColor: '#FFFFFF' }}>
            <Layout.Content
                style={{
                    padding: 24,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    minHeight: 280,
                    width: '80%'
                }}
            >
                <h3 className="title-course" >{overview?.name}</h3>
                <Collapse defaultActiveKey={['1']} className="collapse-wrap">
                    {overview && overview.weeks.map((dataWeek) => (
                        <Collapse.Panel header={`Week ${dataWeek.idWeek}`} key={dataWeek.idWeek} className="panel-wrap">
                            <OverviewWeek dataWeek={dataWeek} idCourse={id} />
                        </Collapse.Panel>
                    ))}
                </Collapse>
                <div className="pendal"></div>
            </Layout.Content>
        </Layout>
       
    )
}

export default Overview


