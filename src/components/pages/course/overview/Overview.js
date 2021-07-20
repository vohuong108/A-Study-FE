import React from 'react'
import 'antd/dist/antd.css';
import './Overview.scss'
import { CheckCircleFilled } from '@ant-design/icons'
import { Layout, Collapse  } from 'antd';
const { Header, Content, Sider } = Layout;
const { Panel } = Collapse;
const Overview = () => {
    const callback = () => {}
    const title = 'Linear Regression'
    const text = 'abc'
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
                <Collapse defaultActiveKey={['1']} onChange={callback} className="collapse-wrap">
                    <Panel header="Week 1" key="1" className="panel-wrap">
                        <h3>{title}</h3>
                        <div className="week-content">
                            <div className="left">
                                <div className="left-item"><a>Videos</a></div>
                                <div className="left-item"><a>Readings</a></div>
                            </div>
                            <div className="right">
                                <div className="right-content">
                                    <table>
                                        <tr>
                                            <th>REQUIRED</th>
                                            <th>GRADE</th>
                                            <th>DUE</th>
                                        </tr>
                                        <tr>
                                            <td className="require">
                                                <div className="check">
                                                    <CheckCircleFilled 
                                                        style={{
                                                            fontSize: '1.5rem', 
                                                            color: 'rgb(31, 131, 84)'
                                                        }}
                                                    />
                                                </div>
                                                <div className="require-content">
                                                    <span>Quiz</span><br/>
                                                    <span>15 min</span>

                                                </div>
                                            </td>
                                            <td>100%</td>
                                            <td>
                                                <span>Jul 12</span><br/>
                                                <span>1:59 PM +07</span>
                                            </td>

                                            
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Week 2" key="2" className="panel-wrap">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="Week 3" key="3" className="panel-wrap">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="Week 4" key="4" className="panel-wrap">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="Week 5" key="5" className="panel-wrap">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="Week 6" key="6" className="panel-wrap">
                        <p>{text}</p>
                    </Panel>
                    
                </Collapse>

            </Content>
        </Layout>
       
    )
}

export default Overview
