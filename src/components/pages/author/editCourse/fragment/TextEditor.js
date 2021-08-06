import React, { useEffect, useState, useContext } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { Button, Switch } from 'antd'
import { useForm, Controller } from "react-hook-form"
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { EditWeekContext } from '../editWeek/EditWeek'
import './TextEditor.scss'

const TextEditor = ({ action }) => {
    const { control, handleSubmit, register } = useForm();
    const weekContext = useContext(EditWeekContext);

    const onSubmit = data => {
        let readingContent = draftToHtml(convertToRaw(data.editor.getCurrentContent()));
        let newRead = {
            idLecture: weekContext.weekData.lectures.length,
            content: readingContent,
            type: 'reading',
            name: data.read_name,
            status: data.status,
            
        }
        console.log(readingContent);
        weekContext.setWeekData({
            ...weekContext.weekData,
            lectures: [...weekContext.weekData.lectures, newRead]
        })
    }

    console.log('weekContext: ', weekContext)

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
                        onChange={(checked) => checked ? field.onChange('publish') : field.onChange('private')}
                    />
                }
            />
            <Button htmlType="submit" className="t-editor-save" shape="round" type="primary">Save</Button>
        </form>
    );
      
}

export default TextEditor