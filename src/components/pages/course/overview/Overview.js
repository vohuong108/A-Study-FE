import React from 'react'
import 'antd/dist/antd.css';
import './Overview.scss'

import OverviewWeek from './OverviewWeek';
import { Layout, Collapse  } from 'antd';
const { Panel } = Collapse;
const { Content } = Layout;

const Overview = () => {
    const data = {
        weeks: [
            {
                name: "week 1",
                title: "Linear Regression",
                quiz: {
                    time: "15 min",
                    grade: '100%',
                    due: 'Jul 12 1:59 PM +07'
                }
            }, {
                name: "week 2",
                title: "Classification",
                quiz: {
                    time: "15 min",
                    grade: '100%',
                    due: 'Jul 12 1:59 PM +07'
                }
            }, {
                name: "week 3",
                title: "Clustering and Similarity",
                quiz: {
                    time: "15 min",
                    grade: '100%',
                    due: 'Jul 12 1:59 PM +07'
                }
            }
        ]
    }

    const arr = data.weeks.map((dataWeek, index) => <OverviewWeek dataWeek={dataWeek} index={index} />);
    

    return (
        <Layout className="overview" style={{ backgroundColor: '#FFFFFF' }}>
            <Content
                style={{
                    padding: 24,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    minHeight: 280,
                    width: '80%'
                }}
            >
                <h3 className="title-course" >Machine Learning Foundations: A Case Study Approach</h3>
                <Collapse defaultActiveKey={['0']} className="collapse-wrap">
                    {data.weeks.map((dataWeek, index) => (
                        <Panel header={dataWeek.name} key={index} className="panel-wrap">
                            <OverviewWeek dataWeek={dataWeek} index={index} />
                        </Panel>
                    ))}
                </Collapse>

            </Content>
        </Layout>
       
    )
}

export default Overview


