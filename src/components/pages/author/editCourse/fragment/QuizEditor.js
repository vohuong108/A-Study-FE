import React, { useState, useContext, useEffect } from 'react';
import { DownCircleFilled, PlusOutlined, RightCircleFilled } from '@ant-design/icons'
import { Input, InputNumber, Checkbox, Button, DatePicker, TimePicker, Tag, Switch } from 'antd';
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { EditWeekContext } from '../editWeek/EditWeek'
import { DeleteFilled } from '@ant-design/icons';
import './QuizEditor.scss'
import moment from 'moment'

const QuizEditor = ({ action, setVisible }) => {
    const { control, handleSubmit, register, formState: { errors }, setValue } = useForm();
    const weekContext = useContext(EditWeekContext);
    
    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: "content",
            keyName: "id"
        }
    );
    
    const onSubmit = data => {
        console.log("form: ", data)

        let newQuiz = {
            idLecture: action?.type === 'EDIT' ? action.data.idLecture : weekContext.weekData.lectures.length,
            type: 'quiz',
            name: data.quiz_name,
            status: data.status,
            dueDate: data.due_date,
            time: data.working_time,
            content: data.content,
        }

        if(action && action.type === 'EDIT') {
            let deepCloneWeekData = JSON.parse(JSON.stringify(weekContext.weekData));

            const index = deepCloneWeekData.lectures.findIndex((item) => action.data.idLecture === item.idLecture)

            if(index > -1) deepCloneWeekData.lectures[index] = newQuiz;

            weekContext.setWeekData({...deepCloneWeekData});

        } else {
            weekContext.setWeekData({
                ...weekContext.weekData, 
                lectures: [...weekContext.weekData.lectures, newQuiz]
        
            })
            setVisible(false);
        }

    }

    useEffect(() => {
        if(action?.type === 'EDIT') {
            console.log("action props: ", action)
            setValue('quiz_name', action.data.name);
            setValue('working_time', moment(action.data.time));
            setValue('due_date', moment(action.data.dueDate));
            setValue('status', action.data.status);
            setValue('content', action.data.content);
        }
    }, [action])

  return (
      <form id="form-quiz" className="quiz-editor" onSubmit={handleSubmit(onSubmit)}>
        <div className="quiz-title">
            <p>Lecture Title : </p>
            <input type="text" {...register("quiz_name")} required></input>
        </div>
        <div className="quiz-due">
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
        </div> 
        <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            defaultValue="private"
            render={({ field }) => 
                <Switch 
                    className="status-switch"
                    checkedChildren="publish" 
                    unCheckedChildren="private"
                    checked={field.value === "publish"} 
                    onChange={(checked) => checked ? field.onChange('publish') : field.onChange('private')}
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
        <div className="add-question" onClick={() => append({idQuestion: fields.length, point: 1, question: '', choices: []})}>
            <PlusOutlined className="icon-add"/> 
            New Question
        </div>
        
        <Button type="primary" className="q-editor-save" htmlType="submit" >Save Changes</Button>
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
            keyName: "idChoice"
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
                        <tr key={field.idChoice}>
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
            <div className="add-choice" onClick={() =>  append({idChoice: fields.length, choice: '', answer: false})}>New Choice</div>
            
            </td>
        </>
    )
}





export default QuizEditor 