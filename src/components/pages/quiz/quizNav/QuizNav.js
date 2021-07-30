import React from 'react'
import './QuizNav.scss'
import { Card, Statistic } from 'antd'
const { Countdown } = Statistic


const QuizNav = ({ review, marks, handleSubmit, dueTime }) => {
    return (
        <div className="quiz-nav-wrapper">
            <Card className="nav-card">
                <p className="nav-title">Quiz navigation</p>
                {!review ? (<Countdown className="nav-countdown" title="Time remaining" 
                    value={Date.now() + 1000 * 60 * 60 * 24 * 0 + 1000 * 60 * dueTime + 1000 * 1}
                    onFinish={() => handleSubmit()}
                />) : ''}
                <Card className="nav-card-holder" bordered={false}>
                    {marks ? Object.keys(marks).map(idQuestion => (
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
                            <span className={`mark ${marks[idQuestion] ? "mark-act" : ""}`}></span>
                            </a>

                        </Card.Grid>

                    )) : ''}
                    
                </Card>
            </Card>
        </div>
    )
}

export default QuizNav
