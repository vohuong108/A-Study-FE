import React, { useState, useRef, useEffect } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker  } from 'antd';
import TextEditor from './TextEditor'
import VideoEditor from './VideoEditor'
import QuizEditor from './QuizEditor'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './AddLecture.scss'

const AddLecture = () => {
    console.log('re-render in add lecture')
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('reading');

    return (
        <div className="add-lecture">
            <Button className="edit-btn-save" shape="round" type="primary" onClick={() => setVisible(true)}>
                New Content
            </Button>
            <Drawer
                placement='top'
                height="90%"
                title={<div className="title-draw">
                    <p>Create a new lecture</p>
                    <Select className="option-type" defaultValue="reading" style={{ width: 120 }} onSelect={(key) => setType(key)} >
                        <Select.Option value="video">Video</Select.Option>
                        <Select.Option value="reading">Reading</Select.Option>
                        <Select.Option value="quiz">Quiz</Select.Option>
                    </Select>
                </div>}
                visible={visible}
                onClose={() => setVisible(false)}
            >
            {type === 'reading' && <TextEditor />}
            {type === 'video' && <VideoEditor/>}
            {type === 'quiz' && <QuizEditor />}
            </Drawer>
        </div>
    );
}

export default AddLecture
