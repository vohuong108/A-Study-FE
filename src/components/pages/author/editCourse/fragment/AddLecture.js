import React, { useState } from 'react'
import { Drawer, Button, Select } from 'antd';
import TextEditor from './TextEditor'
import VideoEditor from './VideoEditor'
import QuizEditor from './QuizEditor'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './AddLecture.scss'

const AddLecture = ({ weekId }) => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('reading');

    return (
        <div className="add-lecture">
            <Button 
                className="edit-btn-save btn-add-content" 
                shape="round" 
                onClick={() => setVisible(true)}
            >
                New Content
            </Button>
            <Drawer
                placement='top'
                height="90%"
                title={<div className="title-draw">
                    <p>Create a new lecture</p>
                    <Select className="option-type" defaultValue={type} style={{ width: 120 }} onSelect={(key) => setType(key)} >
                        <Select.Option value="video">Video</Select.Option>
                        <Select.Option value="reading">Reading</Select.Option>
                        <Select.Option value="quiz">Quiz</Select.Option>
                    </Select>
                </div>}
                visible={visible}
                onClose={() => setVisible(false)}
                forceRender={true}
                destroyOnClose={true}
            >
            {type === 'reading' && <TextEditor action={{type: 'NEW'}} setVisible={setVisible} weekId={weekId}/>}
            {type === 'video' && <VideoEditor action={{type: 'NEW'}} setVisible={setVisible} weekId={weekId} />}
            {type === 'quiz' && <QuizEditor action={{type: 'NEW'}} setVisible={setVisible} weekId={weekId} />}
            </Drawer>
        </div>
    );
}

export default AddLecture
