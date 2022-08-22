import React, { useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { createLectureContent, updateLectureContent } from '../../../../../features/course/currentCourse/courseAction';
import { selectWeekByID, } from '../../../../../features/course/currentCourse/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import courseApi from '../../../../../api/courseApi';

import './TextEditor.scss';

import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Switch } from 'antd';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';


const TextEditor = ({ action, setVisible, weekId }) => {
    const { control, handleSubmit, register, setValue } = useForm({});
    let { id } = useParams();
    const dispatch = useDispatch();
    const weekRedux = useSelector(state => selectWeekByID(state,  weekId)); 

    const onSubmit = async (data) => {
        console.log(data);
        let contentFile = null;

        if(data.editor) {
            let readingContent = draftToHtml(convertToRaw(data.editor.getCurrentContent()));
        
            let blob = new Blob([readingContent], { type: 'text/plain' });
            contentFile = new File([blob], `${data?.read_name}.txt`, {type: "text/plain"});
        }
        

        if(action && action.type === 'EDIT') {
            let requestData = {
                courseId: id,
                weekId: action.data.weekId,
                contentId: action.data.id,
                contentOrder: action.data.contentOrder,
                name: data.read_name,
                contentType: 'TEXT',
                content: contentFile,
                contentStatus: data.status
            }
    
            console.log(requestData);

            let result_update = await dispatch(updateLectureContent(requestData));
            setVisible(false);

        } else {
            let requestData = {
                weekId: weekId,
                courseId: id,
                contentOrder: weekRedux?.contents?.length || 0,
                name: data.read_name,
                contentType: 'TEXT',
                content: contentFile,
                contentStatus: data.status
            }
    
            let result_add = await dispatch(createLectureContent(requestData));
            setVisible(false);
        }

        
    }

    useEffect(() => {
        if(action?.type === 'EDIT') {
            console.log(action);
            const getTextContent = async () => {
                let result = await courseApi.getLectureContentUrl({courseId: id, weekId: action.data.weekId, contentId: action.data.id})
                let textContent = await axios.get(result.data.url);
    
                const editorState = EditorState.createWithContent(
                    ContentState.createFromBlockArray(convertFromHTML(textContent.data))
                );
    
                setValue('read_name', action.data.name);
                setValue('editor', editorState);
                setValue('status', action.data.contentStatus);
    
            }

            getTextContent();
        }
    }, [action.type])

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
            <Button htmlType="submit" className="t-editor-save" shape="round" type="primary">Save</Button>
        </form>
    );
      
}

export default TextEditor