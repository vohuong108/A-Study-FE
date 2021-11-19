import React, { useEffect } from 'react';
import { Divider, Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { selectLectureByID } from '../../../../../features/course/currentCourse/courseSlice';
import { getQuizContent } from '../../../../../features/quiz/quizAction';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../../../../utils/localStorageHandler';
import './LectureQuiz.scss';

const LectureQuiz = () => {
    const { weekId, lectureId } = useParams();
    const lecture = useSelector(state => selectLectureByID(state, weekId, lectureId, "QUIZ"));
    const quizContent = useSelector(state => state.quiz.quiz);
    const dispatch = useDispatch();

    const handleDueDate = (str) => {
        return new Date(str).toLocaleString();
    }

    const handleTime = (time) => {
        let hour = parseInt(time/3600).toString().padStart(2, "0");
        let min = parseInt((time - hour*3600)/60).toString().padStart(2, "0");
        let sec = (time - hour*36000 - min*60).toString().padStart(2, "0");

        console.log("in lecture quiz: h::m::s ", hour, min, sec);
        return `${hour}:${min}:${sec}`
    }

    useEffect(() => {
        let getContent = async () => {
            let token = getToken();
            console.log("quiz lecture: ", lecture);
    
            if(token && lecture?.url) {
                let requestData = {
                    access_token: token,
                    url: lecture.url
                }
                await dispatch(getQuizContent(requestData));
            }
        }

        getContent();

    }, [weekId, lectureId])

    return (
        <div className="lecture-quiz">
            <h1>{quizContent?.title}</h1>
            <div className="lecture-quiz-info-submit">
                <p>
                    <span>Attempts allowed: </span>
                    <span>{quizContent?.attemptAllow}</span>
                </p>
                
                <p>
                    <span>Due date: </span>
                    <span>{handleDueDate(quizContent?.dueDate)}</span>
                </p>
                <p>
                    <span>Time limit: </span>
                    <span>{handleTime(quizContent?.time)}</span>
                </p>
                <p>
                    <span>Degree: </span>
                    <span>{quizContent?.degree}</span>
                </p>
            </div>
            <Link to={`/quiz/${lectureId}`}>
                <Button className="lecture-btn" type="primary" shape="round" size="large">
                    Start
                </Button>
            </Link>
            <Divider />
            {lecture?.finalGrade && 
                <div className="lecture-quiz-grade">
                    {`Your final grade for this quiz is ${lecture.finalGrade}`}
                </div>
            }
        </div>
    )
}

export default LectureQuiz

