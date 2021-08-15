import React from 'react'
import './QuizNav.scss'
import { Card, Statistic } from 'antd'
const { Countdown } = Statistic


const QuizNav = ({ review, handleSubmit, dueTime, navData }) => {
    

    const handleDueTime = (str) => {
        if(str) {
            let date = new Date(str);
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();

            return hour*1000*60*60*24 + min*1000*60 + 1000*(sec+1);
        } else return 0;
    }
    return (
        <div className="quiz-nav-wrapper">
            <Card className="nav-card">
                <p className="nav-title">Quiz navigation</p>
                {!review ? (<Countdown className="nav-countdown" title="Time remaining" 
                    value={Date.now() + handleDueTime(dueTime)}
                    onFinish={() => handleSubmit()}
                />) : ''}
                <Card className="nav-card-holder" bordered={false}>
                    {navData ? Object.keys(navData).map(idQuestion => (
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
                            <span className={`mark ${navData[idQuestion] ? "mark-act" : ""}`}></span>
                            </a>

                        </Card.Grid>

                    )) : ''}
                    
                </Card>
            </Card>
        </div>
    )
}

export default QuizNav
