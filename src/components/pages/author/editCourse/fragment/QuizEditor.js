import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createQuizContent, updateQuizContent } from '../../../../../features/course/currentCourse/courseAction';
import { selectWeekByID, } from '../../../../../features/course/currentCourse/courseSlice';
import courseApi from '../../../../../api/courseApi';

import './QuizEditor.scss';

import { DownCircleFilled, PlusOutlined, RightCircleFilled } from '@ant-design/icons'
import { Input, InputNumber, Checkbox, Button, DatePicker, TimePicker, Tag, Switch, Select } from 'antd';
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { DeleteFilled } from '@ant-design/icons';


const QuizEditor = ({ action, setVisible, weekId }) => {
    console.log('re-render in quiz editor: ', action);

    const { control, handleSubmit, register, formState: { errors }, setValue } = useForm();
    const dispatch = useDispatch();
    const weekRedux = useSelector(state => selectWeekByID(state,  weekId));
    let { id } = useParams();

    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: "content",
            keyName: "id"
        }
    );

    const splitTime = (time) => {
        let h = time.hours();
        let m = time.minutes();
        let s = time.seconds();

        return h * 3600 + m * 60 + s;
    } 
    
    const onSubmit = async (data) => {
        console.log(data)
        let maxScore = data?.content.reduce((total, question) => total + question.point, 0);
        
        let time = splitTime(data.working_time);

        let questions = data.content.map((q, indexq) => {
            let countAns = 0
            let options = q.choices.map((c, indexc) => {
                countAns = c.answer ? countAns + 1 : countAns;
                return {
                    content: c.choice,
                    isCorrect: c.answer,
                    optionOrder: indexc
                }
            })
            return {
                name: q.question, 
                questionType: countAns >= 2 ? "MULTIPLE_CHOICE" : "ONE_CHOICE", 
                score: q.point, 
                questionOrder: indexq,
                options: options
            }
        });


        if(action && action.type === 'EDIT') {

            let requestData = {
                courseId: id,
                weekId: action.data.weekId,
                quizId: action.data.id,
                data: {
                    name: data.quiz_name,
                    contentOrder: action.data.contentOrder,
                    contentStatus: data.status,
                    releaseDate: data.release_date.utc().toISOString(),
                    contentType: "QUIZ",
                    maxScore: maxScore,
                    degree: data.degree,
                    time: time,
                    closeDate: data.due_date.utc().toISOString(),
                    attemptAllow: data.attempt_allow,
                    questions: questions,
                }
            };

            console.log(requestData)
            await dispatch(updateQuizContent(requestData));
            // setVisible(false);

        } else {

            let requestData = {
                courseId: id,
                weekId: weekId,
                data: {
                    name: data.quiz_name,
                    contentOrder: weekRedux?.contents?.length || 0,
                    contentStatus: data.status,
                    releaseDate: data.release_date.utc().toISOString(),
                    contentType: "QUIZ",
                    maxScore: maxScore,
                    degree: data.degree,
                    time: time,
                    closeDate: data.due_date.utc().toISOString(),
                    attemptAllow: data.attempt_allow,
                    questions: questions,
                }
            }

            console.log(requestData)
            await dispatch(createQuizContent(requestData));
            // setVisible(false);
        }

    }

    useEffect(() => {
        if(action?.type === 'EDIT') {
            console.log(action);
            const getQuizContent = async () => {
                let result = await courseApi.getQuizContentEdit({
                    courseId: id, 
                    weekId: action.data.weekId, 
                    quizId: action.data.id
                });
    
                setValue('quiz_name', result.data.name);
                setValue('release_date', moment.utc(result.data.releaseDate).local());
                setValue('working_time', moment.utc(result.data.time * 1000));
                setValue('due_date', moment.utc(result.data.closeDate).local());
                setValue('attempt_allow', result.data.attemptAllow);
                setValue('degree', result.data.degree);
                setValue('status', result.data.contentStatus);

                let questions = [...result.data.questions].sort((a, b) => a.questionOrder - b.questionOrder);

                questions = questions.map((q, indexq) => {
                    let choices = [...q.options].sort((a, b) => a.optionOrder - b.optionOrder);
                    choices = choices.map((o, indexo) => ({
                        choiceId: indexo,
                        answer: o.isCorrect,
                        choice: o.content
                    }));

                    return {
                        question: q.name,
                        point: q.score, 
                        questionId: indexq,
                        choices: choices
                    }
                });

                setValue('content', questions);
    
            }

            getQuizContent();
        }
    }, [action.type])

  return (
      <form id="form-quiz" className="quiz-editor" onSubmit={handleSubmit(onSubmit)}>
        <div className="quiz-title">
            <p>Lecture Title : </p>
            <input type="text" {...register("quiz_name")} required></input>
        </div>
        <div className="quiz-due">
            <div className="due working-time">
                <Tag color="cyan" className="due-label">Release Date: </Tag>
                <Controller
                    name="release_date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                        <DatePicker value={field.value} showTime onChange={(date) => field.onChange(date)}/>
                    }
                />
                {errors.working_time?.type === 'required' && <p className="err-msg">Release date is required</p>}
            </div>
            <div className="due working-time">
                <Tag color="cyan" className="due-label">Working Time: </Tag>
                <Controller
                    name="working_time"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                        <TimePicker value={field.value} onChange={(time) => field.onChange(time)}/>
                    }
                />
                {errors.working_time?.type === 'required' && <p className="err-msg">Working time is required</p>}
            </div>
            <div className="due due-date">
                <Tag color="#f50" className="due-label">Due Date: </Tag>
                <Controller
                    name="due_date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                        <DatePicker value={field.value} showTime onChange={(date) => field.onChange(date)}/>
                    }
                />
                {errors.due_date?.type === 'required' && <p className="err-msg">Due date is required</p>}
            </div>
            <div className="due attempt-allow">
                <Tag color="cyan" className="attempt-allow">Attempt-allow: </Tag>
                <Controller
                    name="attempt_allow"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                        <InputNumber min={1} value={field.value} onChange={(value) => field.onChange(value)} />
                    }
                />
                {errors.attempt_allow?.type === 'required' && <p className="err-msg">Attempt_allow is required</p>}
            </div>
            <div className="due degree">
                <Tag color="cyan" className="degree">Degree: </Tag>
                <Controller
                    name="degree"
                    defaultValue={"EASY"}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                        <Select 
                            className="degree-type" 
                            defaultValue={"EASY"} 
                            style={{ width: 120 }} 
                            onSelect={(key) => field.onChange(key)}
                            value={field.value}
                        >
                            <Select.Option value="EASY">EASY</Select.Option>
                            <Select.Option value="MEDIUM">MEDIUM</Select.Option>
                            <Select.Option value="HARD">HARD</Select.Option>
                        </Select>
                    }
                />
                {errors.degree?.type === 'required' && <p className="err-msg">Degree is required</p>}
            </div>
        </div> 
        <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            defaultValue="PRIVATE"
            render={({ field }) => 
                <Switch 
                    className="status-switch"
                    checkedChildren="PUBLIC" 
                    unCheckedChildren="PRIVATE"
                    checked={field.value === "PUBLIC"} 
                    onChange={(checked) => checked ? field.onChange('PUBLIC') : field.onChange('PRIVATE')}
                />
            }
        />
        <table className="quiz-table">
            <thead className="quiz-table-thead">
                <tr>
                    <th></th>
                    <th>Question</th>
                    <th>Point</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody className="quiz-table-tbody">
                {fields.map((item, index) => (
                    <ExpandedRow 
                        key = {item.id}
                        data = {item}
                        index = {index}
                        control={control}
                        handle={{remove}}
                        errors={errors}
                    />
                ))}
            </tbody>
        </table>
        <div 
            className="add-question" 
            onClick={() => append({
                questionId: fields[fields.length-1]?.questionId + 1 || 0, 
                point: 1, 
                question: '', 
                choices: []
            })}
        >
            <PlusOutlined className="icon-add"/> 
            New Question
        </div>
        <Button type="primary" className="q-editor-save" htmlType="submit" htmlFor="form-quiz" shape="round" >Save</Button>
      </form>

  );
}

const ExpandedRow = ({ index, control, errors, handle }) => {
    const [clicked, setClicked] = useState(true);

    console.log('re-render in expanded row: ');

    return (
        <>
            <tr>
                <td onClick={() => setClicked(!clicked)}>
                    {clicked ? <RightCircleFilled className="quiz-icon"/> : <DownCircleFilled className="quiz-icon"/>}
                </td>
                <td>
                    <Controller
                        name={`content.${index}.question`}
                        control={control}
                        rules={{ required: true }} 
                        render={({ field }) => 
                            <Input placeholder="Type Question" value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                        }
                    />
                    {errors?.content?.[index]?.question?.type === 'required' && <p className="err-msg">Question is required</p>}
                </td>
                <td>
                    <Controller
                        name={`content.${index}.point`}
                        control={control}
                        rules={{ required: true }} 
                        render={({ field }) => 
                            <InputNumber min={1} max={10} value={field.value} onChange={(value) => field.onChange(value)} />
                        }
                    />
                </td>
                <td>
                    <Button type="primary" danger onClick={() => handle.remove(index)}>Del</Button>
                </td>
            </tr>
            <tr>
                <ExpandedChoice control={control} errors={errors} indexRow={index} clicked={clicked}/>
            </tr>
        
        </>
    );
};

const ExpandedChoice = ({ control, errors, indexRow, clicked }) => {
    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: `content.${indexRow}.choices`,
            keyName: "choiceId"
        }
    );

    return (
        <>
            <td className={`td-wrap-table-choices ${clicked && 'wrap-act'}`} colSpan="4">
            <table className="table-choices">
                <thead>
                    <tr>
                        <th>Choice</th>
                        <th>Answer</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field, index) => 
                        <tr key={field.choiceId}>
                            <td>
                                <Controller
                                    name={`content.${indexRow}.choices.${index}.choice`}
                                    control={control}
                                    rules={{ required: true }} 
                                    render={({ field }) => 
                                        <Input placeholder="Type Question" value={field.value} onChange={(e) => field.onChange(e.target.value)}/>
                                    }
                                />
                                {errors?.content?.[indexRow]?.choices?.[index]?.choice?.type === 'required' && <p className="err-msg">Choice is required</p>}
                            </td>
                            <td>
                                <Controller
                                    name={`content.${indexRow}.choices.${index}.answer`}
                                    control={control}
                                    render={({ field }) => 
                                        <Checkbox className="checkbox-ans" checked={field.value} onChange={(e) => field.onChange(e.target.checked)}/>
                                    }
                                />
                            </td>
                            <td>
                                <DeleteFilled className="del-choice" onClick={() => remove(index)}/>
                            </td>
                        </tr>
                    )}

                    
                </tbody>
            </table>
            <div 
                className="add-choice"
                onClick={() =>  append({
                    choiceId: fields[fields.length-1]?.choiceId + 1 || 0, 
                    choice: '', 
                    answer: false
                })}
            >New Choice</div>
            
            </td>
        </>
    )
}





export default QuizEditor 