import React, { useEffect, } from 'react';
import './TextEditor.scss';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Switch } from 'antd';
import { useForm, Controller } from "react-hook-form";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { getToken } from '../../../../../utils/localStorageHandler';
import { addLecture, updateLecture } from '../../../../../features/course/currentCourse/courseAction';
import { selectWeekByID, } from '../../../../../features/course/currentCourse/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const TextEditor = ({ action, setVisible, weekId }) => {
    const { control, handleSubmit, register, setValue } = useForm();
    const dispatch = useDispatch();
    const weekRedux = useSelector(state => selectWeekByID(state,  weekId)); 

    const onSubmit = async data => {
        let token = getToken();
        let readingContent = draftToHtml(convertToRaw(data.editor.getCurrentContent()));
        
        let blob = new Blob([readingContent], { type: 'text/plain' });
        let file = new File([blob], `${data?.read_name}.txt`, {type: "text/plain"});

        if(action && action.type === 'EDIT') {
            let requestData = {
                access_token: token,
                data: {
                    lectureId: action?.data?.lectureId,
                    weekId: action?.data?.weekId,
                    title: data.read_name,
                    lectureType: 'TEXT',
                    content: file,
                    lectureStatus: data.status
                }
            }
    
            let result_update = await dispatch(updateLecture(requestData));
            setVisible(false);

        } else {
            let requestData = {
                access_token: token,
                data: {
                    weekId: weekRedux.weekId,
                    indexLecture: action?.type === 'EDIT' ? action.data.indexLecture : weekRedux.lectures.length,
                    title: data.read_name,
                    lectureType: 'TEXT',
                    content: file,
                    lectureStatus: data.status
                }
            }
    
            let result_add = await dispatch(addLecture(requestData));
            setVisible(false);
        }

        
    }

    useEffect(() => {
        const getTextContent = async () => {
            let result = await axios.get(`http://localhost:8888/api${action.data.url}`);
            console.log("result in text editor: ", result);
            const editorState = EditorState.createWithContent(
                ContentState.createFromBlockArray(convertFromHTML(result.data))
            );

            setValue('read_name', action.data.title);
            setValue('editor', editorState);
            setValue('status', action.data.lectureStatus);

        }
        if(action?.type === 'EDIT') {
            getTextContent();
        }
    }, [])

    return (
        <form id="form-text-editor" onSubmit={handleSubmit(onSubmit)}>
            <div className="read-title">
                <p>Lecture Title : </p>
                <input type="text" {...register("read_name")} required></input>
            </div>
            <Controller
                name="editor"
                control={control}
                defaultValue={EditorState.createEmpty()}
                rules={{ required: true }}
                render={({ field }) => 
                    <Editor
                        editorState={field.value}
                        wrapperClassName="editor-wrapper"
                        toolbarClassName="toolbar"
                        editorClassName="editor"
                        onEditorStateChange={(value) => field.onChange(value)}
                    />

                }
            />
            <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                defaultValue="private"
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
            <Button htmlType="submit" className="t-editor-save" shape="round" type="primary">Save</Button>
        </form>
    );
      
}

export default TextEditor