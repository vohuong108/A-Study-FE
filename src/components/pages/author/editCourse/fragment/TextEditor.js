import React, { useEffect, useState, useContext } from 'react'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { Button, Switch } from 'antd'
import { useForm, Controller } from "react-hook-form"
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { EditWeekContext } from '../editWeek/EditWeek'
import './TextEditor.scss'

const TextEditor = ({ action, setVisible }) => {
    const { control, handleSubmit, register, setValue } = useForm();
    const weekContext = useContext(EditWeekContext);

    const onSubmit = data => {
        let readingContent = draftToHtml(convertToRaw(data.editor.getCurrentContent()));

        let newRead = {
            idLecture: action?.type === 'EDIT' ? action.data.idLecture : weekContext.weekData.lectures.length,
            content: readingContent,
            type: 'reading',
            name: data.read_name,
            status: data.status,
            
        }

        if(action && action.type === 'EDIT') {
            let deepCloneWeekData = JSON.parse(JSON.stringify(weekContext.weekData));

            const index = deepCloneWeekData.lectures.findIndex((item) => action.data.idLecture === item.idLecture)

            if(index > -1) deepCloneWeekData.lectures[index] = newRead;

            weekContext.setWeekData({...deepCloneWeekData});

        } else {
            weekContext.setWeekData({
                ...weekContext.weekData, 
                lectures: [...weekContext.weekData.lectures, newRead]
        
            })
            setVisible(false);
        }

        
    }

    useEffect(() => {
        if(action?.type === 'EDIT') {
            const editorState = EditorState.createWithContent(
                ContentState.createFromBlockArray(convertFromHTML(action.data.content))
            );

            setValue('read_name', action.data.name);
            setValue('editor', editorState);
            setValue('status', action.data.status);
        }
    }, [action])

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
                        checkedChildren="publish" 
                        unCheckedChildren="private" 
                        checked={field.value === "publish"}
                        onChange={(checked) => checked ? field.onChange('publish') : field.onChange('private')}
                    />
                }
            />
            <Button htmlType="submit" className="t-editor-save" shape="round" type="primary">Save</Button>
        </form>
    );
      
}

export default TextEditor