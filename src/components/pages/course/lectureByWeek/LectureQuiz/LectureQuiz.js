import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import courseApi from '../../../../../api/courseApi';
import moment from 'moment';

import './LectureQuiz.scss';

import { Divider, Button, message } from 'antd';


const LectureQuiz = () => {
    const { courseId, weekId, contentId } = useParams();
    const [ quizOverview, setQuizOverview] = useState();
    const history = useHistory();

    const handleDueDate = (str) => {
        return moment.utc(str).local().format("HH:mm:ss A, DD-MM-yyyy");
    }

    const handleTime = (time) => {
        let hour = parseInt(time/3600).toString().padStart(2, "0");
        let min = parseInt((time - hour*3600)/60).toString().padStart(2, "0");
        let sec = (time - hour*36000 - min*60).toString().padStart(2, "0");

        // console.log("in lecture quiz: h::m::s ", hour, min, sec);
        return `${hour}:${min}:${sec}`
    }

    useEffect(() => {
        let getContent = async () => {
            try {
                let response = await courseApi.getQuizOverview({courseId, weekId, quizId: contentId});
                console.log(response);
                setQuizOverview(response.data);

            } catch (err) {
                console.log(err.response.data);
                message.error({
                    content: err.response.data.message,
                    style: {marginTop: '72px'},
                    key: "enroll-msg"
                });

                history.push(`/course/${courseId}/week/${weekId}`);
            }
        }

        getContent();
        
    }, [weekId, contentId])

    return (
        <div className="lecture-quiz">
            <h1>{quizOverview?.name}</h1>
            <div className="lecture-quiz-info-submit">
                <p>
                    <span>Attempts allowed: </span>
                    <span>{quizOverview?.attemptAllow}</span>
                </p>
                
                <p>
                    <span>Due date: </span>
                    <span>{handleDueDate(quizOverview?.closeDate)}</span>
                </p>
                <p>
                    <span>Time limit: </span>
                    <span>{handleTime(quizOverview?.time)}</span>
                </p>
                <p>
                    <span>Degree: </span>
                    <span>{quizOverview?.degree}</span>
                </p>
            </div>
            <Link to={`/quiz/${contentId}`}>
                <Button className="lecture-btn" type="primary" shape="round" size="large">
                    Start
                </Button>
            </Link>
            <Link to={`/submit/${contentId}`}>
                <Button style={{marginLeft: '10px'}} className="lecture-btn" type="primary" shape="round" size="large">
                    Review
                </Button>
            </Link>
            <Divider />
            {/* {lecture?.finalGrade && 
                <div className="lecture-quiz-grade">
                    {`Your final grade for this quiz is ${lecture.finalGrade}`}
                </div>
            } */}
        </div>
    )
}

export default LectureQuiz

