import React from 'react'
import './Lecture.scss'
import 'antd/dist/antd.css';
import { CheckCircleFilled, PlayCircleOutlined, ReadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

const topicItem = ({ iconComponent, data }) => {


}

const Lecture = () => {
    return (
        <div className="lecture">
            <div className="lecture-container">
                <div className="lecture-row">
                    <div className="lecture-header">
                        <h1>Week1</h1>
                        <p>Machine Learning Foundations: A Case Study Approach</p>
                    </div>
                    <div className="lecture-content-wrap">
                        <div className="lecture-subtopic">
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
                        <div className="lecture-subtopic">
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
                        <div className="lecture-subtopic">
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
                </div>
            </div>
            
        </div>
    )
}

export default Lecture
