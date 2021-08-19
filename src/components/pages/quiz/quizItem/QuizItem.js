import React from 'react'
import './QuizItem.scss'
import { Controller } from "react-hook-form"
import { Radio, Space, Tag, Card, Row, Col } from 'antd'
import { marked } from '../../../../features/quiz/quizSlice'
import { useDispatch } from 'react-redux'

const QuizItem = ({ data, control, review, indexQ, setValue }) => {
    console.log("re-render in quiz item")
    return (
        <>
        {data && 
            <div id={`quiz-item-${data.idQuestion}`} className="quiz-item">
                <Row className="quiz-item-row">
                    <Col xs={24} sm={24} xl={4}>
                        <Card className="card-frag">
                            <h4>{`Question ${data.idQuestion}`}</h4>
                            <Tag color="cyan" style={{marginBottom: '0.5rem'}}>{`${data.point} Point`}</Tag>
                            {(review && data.isCorrect) ? <Tag color="#87d068">Correct</Tag> : ''}
                            {(review && !data.isCorrect) ? <Tag color="#f50">Uncorrect</Tag> : ''}
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} xl={20}>
                        <Card
                            className="card-question"
                            title={`${data.question}?`} 
                            bordered={false}
                        >
                        {review && <ReviewAnswer   choices={data.choices} />}
                        {(!review && data.type === 'one') && <OneAnswer idQuestion={data.idQuestion} indexQ={indexQ} control={control} choices={data.choices} setValue={setValue}/>}
                        {(!review && data.type === 'many') && <ManyAnswer idQuestion={data.idQuestion} indexQ={indexQ} control={control} choices={data.choices} />}
                        </Card>
                    </Col>

                </Row>
            </div>
        }
        </>
    )
}

const areEqual = (prevProps, nextProps) => {
    if (prevProps.data != nextProps.data || prevProps.control != nextProps.control) return false;
    else return true;
}

export default React.memo(QuizItem, areEqual);


const ReviewAnswer = ({choices}) => {
    return (
        <Space direction="vertical">
        {choices.map((choice) => (
            <Radio key={choice.idChoice} disabled checked={choice.answer}>{choice.choice}</Radio>
            
        ))}
        </Space>
    )
}

const ManyAnswer = ({ control, choices, idQuestion, indexQ }) => {
    const dispatch = useDispatch();

    return (
        <>
            <p className="select-type">Select many:</p>
            <Space direction="vertical">
                {choices.map((choice, indexC) => 
                    <Controller
                        key={indexC}
                        control={control}
                        name={`content.${indexQ}.choices.${indexC}.answer`}
                        defaultValue={false}
                        render={({field}) => 
                        <>
                            <input 
                                className="select-choice"
                                name={`many-${indexC}`} 
                                key={`${idQuestion}-${choice.idChoice}`}
                                id={`${idQuestion}-${choice.idChoice}`} 
                                onClick={() => {
                                    field.onChange(!field.value);
                                    dispatch(marked({ idQuestion }));
                                }}
                                type="radio"
                                value={choice.choice}
                                checked={field.value}
                            />
                            <label className="label-choice" htmlFor={`${idQuestion}-${choice.idChoice}`}>{choice.choice}</label>
                        </>
                        }
                    />
                )}
            </Space>
        </>
    )
}

const OneAnswer = ({ control, choices, idQuestion, setMarks, indexQ, setValue }) => {
    const dispatch = useDispatch();

    const handleOneChoose = (indexC) => {
        choices.forEach((_, index)=> {
            if(index !== indexC) setValue(`content.${indexQ}.choices.${index}.answer`, false)
            else setValue(`content.${indexQ}].choices.${indexC}.answer`, true)
        })
        dispatch(marked({ idQuestion }));
    }

    return (
        <>
            <p className="select-type">Select one:</p>
            <Space direction="vertical">
                {choices.map((choice, indexC) => 
                    <Controller
                        key={indexC}
                        control={control}
                        name={`content.${indexQ}.choices.${indexC}.answer`}
                        defaultValue={false}
                        render={({field}) => 
                        <>
                            <input
                                className="select-choice" 
                                name={`one-${indexQ}`} 
                                key={`${idQuestion}-${choice.idChoice}`}
                                id={`${idQuestion}-${choice.idChoice}`} 
                                onClick={() => handleOneChoose(indexC)}
                                type="radio"
                                value={choice.choice}
                            />
                            <label className="label-choice" htmlFor={`${idQuestion}-${choice.idChoice}`}>{choice.choice}</label>
                        </>
                        }
                    />
                )}
            </Space>

        </>
    )
}