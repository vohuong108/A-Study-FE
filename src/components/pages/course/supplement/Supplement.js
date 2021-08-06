import React from 'react'
import './Supplement.scss'
import 'antd/dist/antd.css';
import { CheckCircleFilled, PlayCircleOutlined, ReadOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import { Link } from 'react-router-dom';
const topicItem = ({ iconComponent, data }) => {


}

const Supplement = () => {
    return (
        <div className="supplement">
            <div className="supplement-container">
                <div className="supplement-row">
                    <div className="supplement-header">
                        <h1>Week1</h1>
                        <p>Machine Learning Foundations: A Case Study Approach</p>
                    </div>
                    <div className="supplement-content-wrap">
                        <div className="supplement-subtopic">
                            <h3>Why you should learn machine learning with us</h3>
                            <ul className="subtopic-wrap">
                                <li>
                                    <Link to={"/"}>
                                        <ReadOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Reading: </strong>
                                            Important Update regarding the Machine Learning Specialization
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        <ReadOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Reading: </strong>
                                            Slides presented in this module
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        <PlayCircleOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Video: </strong>
                                            Who we are
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        <PlayCircleOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Video: </strong>
                                            Machine learning is changing the world
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="supplement-subtopic">
                            <h3>Why you should learn machine learning with us</h3>
                            <ul className="subtopic-wrap">
                                <li>
                                    <Link to={"/"}>
                                        <ReadOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Reading: </strong>
                                            Important Update regarding the Machine Learning Specialization
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        <ReadOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Reading: </strong>
                                            Slides presented in this module
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        <PlayCircleOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Video: </strong>
                                            Who we are
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        <PlayCircleOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Video: </strong>
                                            Machine learning is changing the world
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="supplement-subtopic">
                            <h3>Why you should learn machine learning with us</h3>
                            <ul className="subtopic-wrap">
                                <li>
                                    <Link to={"/"}>
                                        <ReadOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Reading: </strong>
                                            Important Update regarding the Machine Learning Specialization
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        <ReadOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Reading: </strong>
                                            Slides presented in this module
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        <PlayCircleOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Video: </strong>
                                            Who we are
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        <PlayCircleOutlined className="subtopic-icon" />
                                        <p>
                                            <strong>Video: </strong>
                                            Machine learning is changing the world
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to="#">
                        <Button shape="round">Go to edit</Button>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default Supplement
