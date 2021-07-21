import React from 'react'

import 'antd/dist/antd.css';
import { CheckCircleFilled, PlayCircleOutlined, ReadOutlined } from '@ant-design/icons'

const OverviewWeek = ({ dataWeek, index }) => {

    const seprateDatetime = (datetime) => {
        let arr = datetime.split(' ');

        console.log(arr);

    }

    return (
        <>
            <h3>{dataWeek.title}</h3>
            <div className="week-content">
                <div className="left">
                    <div className="left-item">
                        <a>
                            <PlayCircleOutlined className="icon"/>
                            <p>Videos</p>
                        </a>
                    </div>
                    <div className="left-item">
                        <a>
                            <ReadOutlined className="icon"/>
                            <p>Readings</p>
                        </a>
                    </div>
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
                                        <span>{dataWeek.quiz.time}</span>

                                    </div>
                                </td>
                                <td>{dataWeek.quiz.grade}</td>
                                <td>
                                    <span>Jul 12</span><br/>
                                    <span>1:59 PM +07</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverviewWeek
