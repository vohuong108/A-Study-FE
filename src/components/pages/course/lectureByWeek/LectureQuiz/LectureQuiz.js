import React from 'react'
import { Divider, Button, Table } from 'antd'
import { Link } from 'react-router-dom'
import { selectLectureByID } from '../../../../../features/course/currentCourse/courseSlice'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './LectureQuiz.scss'

const LectureQuiz = () => {
    const { idWeek, idLecture } = useParams();
    const lecture = useSelector(state => selectLectureByID(state, idWeek, idLecture));

    const handleDueDate = (str) => {
        return new Date(str).toLocaleString();
    }

    const handleTime = (str) => {
        return new Date(str).toLocaleTimeString();
    }

    const columns = [
        {
          title: 'State',
          className: 'column-state',
          align: 'left',
          render: (_, record) => {
            let date = new Date(record.submitTime);
            let convertedDate = date.toLocaleString();
            return (
              <>
                <p>{record.state}</p>
                <p>{convertedDate}</p>
              </>
            );
          }
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
          render: (_, record) => <Link to={`/submit/${idLecture}/review/${record.idPre}`}>Review</Link>
        },
    ];

    return (
        <div className="lecture-quiz">
            <h1>{lecture?.name}</h1>
            <div className="lecture-quiz-info-submit">
                <p>
                    <span>Attempts allowed: </span>
                    <span>{lecture?.attemptsAllowed}</span>
                </p>
                
                <p>
                    <span>Due date: </span>
                    <span>{handleDueDate(lecture?.dueDate)}</span>
                </p>
                <p>
                    <span>Time limit: </span>
                    <span>{handleTime(lecture?.time)}
                    </span>
                </p>
            </div>
            <Link to={`/quiz/${idLecture}`}>
                <Button className="lecture-btn" type="primary" shape="round" size="large">
                    Start
                </Button>
            </Link>
            <Divider />
            <div className="lecture-quiz-pre-submit">
                <div className="quiz-pre-submit-header">
                    <h3>Summary of your previous attempts</h3>
                    <Link to={`/submit/${idLecture}`}>Go to submit</Link>
                </div>
                <Table 
                  pagination={false}
                  columns={columns}
                  dataSource={lecture?.preAttemp}
                  rowClassName={(record, index) => console.log("table: ", record, index)}
                  rowKey={(record) => record.idPre}
                />
                
            </div>
            {lecture?.finalGrade && 
                <div className="lecture-quiz-grade">
                    {`Your final grade for this quiz is ${lecture.finalGrade}`}
                </div>
            }
        </div>
    )
}

export default LectureQuiz

