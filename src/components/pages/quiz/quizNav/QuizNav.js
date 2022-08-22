import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './QuizNav.scss';

import { Card, Statistic } from 'antd';
const { Countdown } = Statistic;


const QuizNav = ({ review, handleSubmit, dueTime }) => {
    const quizNav = useSelector(state => review ? state.submit.submitNav : state.quiz.quizNav); 
    const isSubmit = useSelector(state => state.quiz.isSubmit);
    
    const handleDueTime = (time) => {
        if(time) {
            
            let hour = parseInt(time/3600);
            let min = parseInt((time - hour*3600)/60);
            let sec = (time - hour*36000 - min*60);

            console.log("h::m::s ", hour, min, sec);
            return hour*1000*60*60*24 + min*1000*60 + 1000*(sec);
            
        } else return 0;
    }

    const handleFinishTime = () => {
        if(isSubmit === false) {
            handleSubmit();
        }
    }

    return (
        <div className="quiz-nav-wrapper">
            <Card className="nav-card">
                <p className="nav-title">Quiz navigation</p>
                {!review ? (<Countdown className="nav-countdown" title="Time remaining" 
                    value={Date.now() + handleDueTime(dueTime)}
                    onFinish={() => handleFinishTime()}
                />) : ''}
                <Card className="nav-card-holder" bordered={false}>
                    {quizNav ? Object.keys(quizNav).map(idQuestion => (
                        <Card.Grid 
                            className="nav-card-grid"
                            style={{ 
                                padding: '0', 
                                width: '30px', 
                                marginRight: '10px',
                                marginBottom: '10px',
                                height: '40px',
                            }}
                            key = {idQuestion}
                        >
                            <a href={`#quiz-item-${idQuestion}`} >
                            <span className="q-holder">{idQuestion}</span>
                            <span className={`mark ${quizNav[idQuestion] ? "mark-act" : ""}`}></span>
                            </a>

                        </Card.Grid>

                    )) : ''}
                    
                </Card>
            </Card>
        </div>
    )
}

export default QuizNav
