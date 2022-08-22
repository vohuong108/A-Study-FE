import React from 'react'
import './QuizItem.scss'
import { Controller } from "react-hook-form"
import { Radio, Space, Tag, Card, Row, Col } from 'antd'
import { marked } from '../../../../features/quiz/quizSlice'
import { useDispatch } from 'react-redux'

const QuizItem = ({ data, control, review, indexQ, setValue }) => {
    // console.log("re-render in quiz item: ", data);
    // console.log("index quiz item: ", indexQ);
    return (
        <>
        {data && 
            <div id={`quiz-item-${data.id}`} className="quiz-item">
                <Row className="quiz-item-row">
                    <Col xs={24} sm={24} xl={4}>
                        <Card className="card-frag">
                            <h4>{`Question ${indexQ}`}</h4>
                            <Tag color="cyan" style={{marginBottom: '0.5rem'}}>{`${data.score} Point`}</Tag>
                            {(review && data.isCorrect) ? <Tag color="#87d068">Correct</Tag> : ''}
                            {(review && !data.isCorrect) ? <Tag color="#f50">Uncorrect</Tag> : ''}
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} xl={20}>
                        <Card
                            className="card-question"
                            title={`${data.name}?`} 
                            bordered={false}
                        >
                        {(!review && data.questionType === "ONE_CHOICE") && <OneAnswer questionId={data.id} indexQ={indexQ} control={control} options={data.options} setValue={setValue}/>}
                        {(!review && data.questionType === "MULTIPLE_CHOICE") && <ManyAnswer questionId={data.id} indexQ={indexQ} control={control} options={data.options} />}
                        {review && <ReviewAnswer options={data.options} />}
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


const ReviewAnswer = ({ options = [] }) => {
    return (
        <Space direction="vertical">
        {options.map(opt => (
            <Radio key={opt.id} disabled checked={opt.isSelect}>{opt.content}</Radio>
        ))}
        </Space>
    )
}

const ManyAnswer = ({ control, options, questionId, indexQ }) => {
    const dispatch = useDispatch();

    const handleManyChoose = (field) => {
        field.onChange(!field.value);
        
        let checkedCount = 0
        control.fieldsRef.current.content[indexQ].options.forEach(opt => {
            if(opt.answer._f.value === true) checkedCount += 1
        });

        console.log("CHECKED COUNT: ", checkedCount);
        if(checkedCount === 0) dispatch(marked({ indexQ: indexQ, markType: false }));
        else if (checkedCount > 0) dispatch(marked({ indexQ: indexQ, markType: true }));
    }

    return (
        <>
            <p className="select-type">Select many:</p>
            <Space direction="vertical">
                {options.map((option, indexC) => 
                    <Controller
                        key={indexC}
                        control={control}
                        name={`content.${indexQ}.options.${indexC}.answer`}
                        defaultValue={false}
                        render={({field}) => 
                        <>
                            <input 
                                className="select-choice"
                                name={`many-${indexC}`} 
                                key={`${questionId}-${option.id}`}
                                id={`${questionId}-${option.id}`} 
                                onClick={() => handleManyChoose(field)}
                                onChange={(e) => (console.log(e.target.value))}
                                type="radio"
                                value={option.content}
                                checked={field.value}
                            />
                            <label className="label-choice" htmlFor={`${questionId}-${option.id}`}>{option.content}</label>
                        </>
                        }
                    />
                )}
            </Space>
        </>
    )
}

const OneAnswer = ({ control, options, questionId, indexQ, setValue }) => {
    const dispatch = useDispatch();

    const handleOneChoose = (indexC) => {
        options.forEach((_, index)=> {
            if(index !== indexC) setValue(`content.${indexQ}.options.${index}.answer`, false);
            else setValue(`content.${indexQ}.options.${index}.answer`, true);
        })
        dispatch(marked({ indexQ: indexQ, markType: true }));
    }

    return (
        <>
            <p className="select-type">Select one:</p>
            <Space direction="vertical">
                {options.map((option, indexC) => 
                    <Controller
                        key={indexC}
                        control={control}
                        name={`content.${indexQ}.options.${indexC}.answer`}
                        defaultValue={false}
                        render={({field}) => 
                        <>
                            <input
                                className="select-choice" 
                                name={`one-${indexQ}`} 
                                key={`${questionId}-${option.id}`}
                                id={`${questionId}-${option.id}`} 
                                onClick={() => handleOneChoose(indexC)}
                                type="radio"
                                value={option.content}
                            />
                            <label className="label-choice" htmlFor={`${questionId}-${option.id}`}>{option.content}</label>
                        </>
                        }
                    />
                )}
            </Space>

        </>
    )
}