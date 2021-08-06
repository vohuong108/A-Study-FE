import React, { useState, useContext } from 'react';
import { DownCircleFilled, PlusOutlined, RightCircleFilled } from '@ant-design/icons'
import { Input, InputNumber, Checkbox, Button, DatePicker, TimePicker, Tag, Switch } from 'antd';
import { useForm, Controller } from "react-hook-form"
import { EditWeekContext } from '../editWeek/EditWeek'
import './QuizEditor.scss'


const QuizEditor = () => {
    const [data, setData] = useState([]);
    const [due, setDue] = useState({time: null, date: null});
    console.log('re-render in quiz editor: ', due);
    const weekContext = useContext(EditWeekContext);
    const { control, handleSubmit, register } = useForm();



    const handleAddQuestion = () => {
        let cloneData = [...data];

        cloneData.push({
        id: cloneData.length,
        question: '',
        point: 1,
        choices: []
        });

        setData(cloneData);
    }

    const handleAddChoice = (idQuestion) => {
        let cloneData = [...data];
        for (let i = 0; i < cloneData.length; i++) {
            if (cloneData[i].id === idQuestion) {
                let lastKey = 64;
    
                if (cloneData[i].choices.length !== 0) {
                    lastKey = cloneData[i].choices[cloneData[i].choices.length - 1].key.charCodeAt(0);
                }
    
                cloneData[i].choices.push({
                    key: String.fromCharCode(lastKey + 1),
                    choice: '',
                    answer: '',
                })
                setData(cloneData);
                break;
            }
        }
    }

    const handleChangeQuestion = (idQuestion, value) => {
        let cloneData = [...data];

        for(let i = 0; i < cloneData.length; i++) {
            if(cloneData[i].id === idQuestion) {
                cloneData[i].question = value;
                setData(cloneData);
                break;
            }
        }
    }

    const handleChangePoint = (idQuestion, value) => {
        let cloneData = [...data];

        for(let i = 0; i < cloneData.length; i++) {
            if(cloneData[i].id === idQuestion) {
                cloneData[i].point = value;
                setData(cloneData);
                break;
            }
        }
    }

    const handleChoicesChange = (idQuestion, key, value) => {
        console.log('in choices')
        let cloneData = [...data];
        for(let i = 0; i < cloneData.length; i++) {
            if(cloneData[i].id === idQuestion) {
                let choices = cloneData[i].choices;

                for(let j = 0; j < choices.length; j++) {
                    if (choices[j].key === key) {
                        cloneData[i].choices[j].choice = value;

                        setData(cloneData);
                        break;
                    }
                }
                break;
            }
        }
    }

    const handleAnswerChange = (idQuestion, key, value) => {
        let cloneData = [...data];
        for(let i = 0; i < cloneData.length; i++) {
            if(cloneData[i].id === idQuestion) {
                let choices = cloneData[i].choices;

                for(let j = 0; j < choices.length; j++) {
                    if (choices[j].key === key) {
                        cloneData[i].choices[j].answer = value;

                        setData(cloneData);
                        break;
                    }
                }
                break;
            }
        }
    }

    const handleChangeWorkingTime = (time, handleController) => {
        if (time) {
            let hour = time.hour();
            let min = time.minute();
            let sec = time.second();

            handleController(60*60*60*hour + 60*min + sec);
        }
    }

    const handleChangeDueDate = (date) => {
        if (date) {
            setDue({
                ...due,
                date: date.toDate(),
            })
        }
    }

  return (
      <form id="form-quiz" className="quiz-editor" >
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
                        <TimePicker onChange={(time) => handleChangeWorkingTime(time, field.onChange)}/>
                    }
                />
            </div>
            <div className="due due-date">
                <Tag color="#f50" className="due-label">Due Date: </Tag>
                <DatePicker showTime onChange={(date) => handleChangeDueDate(date)}/>
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
                </tr>
            </thead>
            <tbody className="quiz-table-tbody">
                {data.map(obj => (
                    <ExpandedRow 
                        key = {obj.id}
                        data = {obj}
                        handle = {{handleAddChoice, handleChoicesChange, handleAnswerChange, handleChangeQuestion, handleChangePoint}}
                    />
                ))}
            </tbody>
        </table>
        <div className="add-question" onClick={() => handleAddQuestion()}>
            <PlusOutlined className="icon-add"/> 
            New Question
        </div>
        
        <Button type="primary" className="q-editor-save" htmlType="submit" >Save Changes</Button>
      </form>

  );
}

const ExpandedRow = ({ data, handle }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <React.Fragment>
        <tr>
            <td onClick={() => setClicked(!clicked)}>
                {clicked ? <RightCircleFilled className="quiz-icon"/> : <DownCircleFilled className="quiz-icon"/>}
                </td>
            <td>
                <Input placeholder="Type Question" value={data.question} onChange={(e) => handle.handleChangeQuestion(data.id, e.target.value)} />
            </td>
            <td>
                <InputNumber min={1} max={10} value={data.point} onChange={(value) => handle.handleChangePoint(data.id, value)} />
            </td>
        </tr>
        <tr>
            <td className={`td-wrap-table-choices ${clicked ? 'wrap-act' : ''}`} colspan="3">
            <table className="table-choices">
                <thead>
                    <tr>
                        <th>Choice</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {data.choices && data.choices.map(opt => (
                        <tr key={opt.key}>
                            <td>
                                <Input placeholder="Type Question" value={opt.choice} onChange={(e) => handle.handleChoicesChange(data.id, opt.key, e.target.value)}/>
                            </td>
                            <td><Checkbox className="checkbox-ans" onChange={(e) => handle.handleAnswerChange(data.id, opt.key, e.target.checked)}/></td>
                        </tr>

                    ))}
                </tbody>
            </table>
            <div className="add-choice" onClick={() => handle.handleAddChoice(data.id)}>New Choice</div>

            </td>
        </tr>
        </React.Fragment>
    );
};

export default QuizEditor 