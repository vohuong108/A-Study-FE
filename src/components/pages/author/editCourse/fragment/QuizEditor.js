import React, { useState, useEffect } from 'react';
import { DownCircleFilled, PlusOutlined, RightCircleFilled } from '@ant-design/icons'
import { Input, InputNumber, Checkbox, Button, DatePicker, TimePicker, Tag, Switch, Select } from 'antd';
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { DeleteFilled } from '@ant-design/icons';
import './QuizEditor.scss'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../../../../utils/localStorageHandler';
import { addQuiz, updateQuiz } from '../../../../../features/course/currentCourse/courseAction';
import { selectWeekByID, } from '../../../../../features/course/currentCourse/courseSlice';
import axios from 'axios';

const QuizEditor = ({ action, setVisible, weekId }) => {
    console.log('re-render in quiz editor: ', action);

    const { control, handleSubmit, register, formState: { errors }, setValue } = useForm();
    const dispatch = useDispatch();
    const weekRedux = useSelector(state => selectWeekByID(state,  weekId));

    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: "content",
            keyName: "id"
        }
    );

    const splitTime = (time) => {
        let arr = time.split(":");
        return arr[0] * 3600 + arr[1] * 60 + arr[2];
    } 
    
    const onSubmit = async (data) => {
        let token = getToken();
        let maxScore = data?.content.reduce((total, question) => total + question.point, 0);
        let time = splitTime(data.working_time._d.toLocaleTimeString());

        if(action && action.type === 'EDIT') {
            let requestData = {
                access_token: token,
                data: {
                    weekId: action?.data?.weekId,
                    quizId: action?.data?.lectureId,
                    title: data.quiz_name,
                    status: data.status,
                    dueDate: data.due_date.utc(),
                    releaseDate: data.release_date.utc(),
                    time: time,
                    attemptAllow: data.attempt_allow,
                    degree: data.degree,
                    questions: data.content,
                    maxScore: maxScore
                }
            }

            let result_update = await dispatch(updateQuiz(requestData));
            setVisible(false);

        } else {
            let requestData = {
                access_token: token,
                data: {
                    weekId: weekRedux.weekId,
                    indexLecture: action?.type === 'EDIT' ? action.data.indexLecture : weekRedux.lectures.length,
                    title: data.quiz_name,
                    status: data.status,
                    dueDate: data.due_date.utc(),
                    releaseDate: data.release_date.utc(),
                    time: time,
                    attemptAllow: data.attempt_allow,
                    degree: data.degree,
                    questions: data.content,
                    maxScore: maxScore
                }
            }
            let result_add = await dispatch(addQuiz(requestData));
            setVisible(false);
        }

    }

    useEffect(() => {
        if(action?.type === 'EDIT') {
            let getQuiz = async () => {
                let access_token = getToken();
                let quizRes = await axios({
                    url: `http://localhost:8888/api${action.data.url}`,
                    method: 'get',
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    },
                });
                console.log("res in get quiz: ", quizRes);
    
                setValue('quiz_name', quizRes.data.title);
                setValue('release_date', moment.utc(quizRes.data.releaseDate).local());
                setValue('working_time', moment.utc(quizRes.data.time * 1000));
                setValue('due_date', moment.utc(quizRes.data.dueDate).local());
                setValue('attempt_allow', quizRes.data.attemptAllow);
                setValue('degree', quizRes.data.degree);
                setValue('status', quizRes.data.status);
                setValue('content', quizRes.data.questions);
            }

            getQuiz();
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
        <div className="add-question" onClick={() => append({questionId: fields.length, point: 1, question: '', choices: []})}>
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
            <div className="add-choice" onClick={() =>  append({choiceId: fields.length, choice: '', answer: false})}>New Choice</div>
            
            </td>
        </>
    )
}





export default QuizEditor 