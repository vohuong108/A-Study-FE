import React from 'react'
import { Divider, Button, Table } from 'antd'
import { Link } from 'react-router-dom'
import './LectureQuiz.scss'
const columns = [
    {
      title: 'State',
      dataIndex: 'state',
      className: 'column-state',
      align: 'left',
      render: (state) => <><p>{state.state}</p><p>{`Submitted ${state.time}`}</p></>
    },
    {
      title: 'Grade',
      className: 'column-grade',
      dataIndex: 'grade',
      align: 'center',
    },
    {
      title: 'Review',
      className: 'column-review',
      align: 'center',
      render: () => <Link to="/">Review</Link>
    },
];

const data = [
    {
        key: '1',
        state: {
            state: 'Finished',
            time: 'Wednesday, 12 May 2021, 10:44 AM'
        },
        grade: '100%',
    }
];

const LectureQuiz = () => {
    return (
        <div className="lecture-quiz">
            <h1>Recommender Systems</h1>
            <div className="lecture-quiz-info-submit">
                <p>
                    <span>Attempts allowed: </span>
                    <span>2</span>
                </p>
                
                <p>
                    <span>Due date: </span>
                    <span>Aug 9, 1:59 PM +07</span>
                </p>
                <p>
                    <span>Time limit: </span>
                    <span>30 min</span>
                </p>
            </div>
            <Link to="/">
                <Button className="lecture-btn" type="primary" shape="round" size="large">
                    Start
                </Button>
            </Link>
            <Divider />
            <div className="lecture-quiz-pre-submit">
                <div className="quiz-pre-submit-header">
                    <h3>Summary of your previous attempts</h3>
                    <Link to="/">Go to submit</Link>
                </div>
                <Table 
                  pagination={false}
                  columns={columns}
                  dataSource={data}
                  rowClassName={(record, index) => console.log("table: ", record, index)}
                />
                
            </div>
            <div className="lecture-quiz-grade">
                Your final grade for this quiz is 100%
            </div>
        </div>
    )
}

export default LectureQuiz