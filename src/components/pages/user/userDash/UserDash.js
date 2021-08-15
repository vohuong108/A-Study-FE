import React, { useEffect, useState } from 'react'
import './UserDash.scss'
import ProgressCourse from '../../course/progressCourse/ProgressCourse'
import { getToken } from '../../../../utils/localStorageHandler'
import { getCourses } from '../../../../features/course/coursesAction'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { Button, Drawer, Select } from 'antd'
import { useForm, Controller } from "react-hook-form"

const UserDash = () => {
    const dispatch = useDispatch();
    const courses = useSelector(stateStore => stateStore.userCourses.courses);
    const user = useSelector(state => state.user.userObj);
    
    useEffect(() => {
        const getUserCourses = async () => {
            try {
                let access_token = getToken();
                const courses = await dispatch(getCourses(access_token))
                const un_courses = unwrapResult(courses);
                
            } catch (error) {
                console.error("error in login: ", error)
            }

        }

        getUserCourses();

    }, [])

    return (
        <div className="userDash">
            <div className="container">
                <div className="row userDash-row">
                    <div className="title">My Courses</div>
                    {courses?.map(course => 
                        <ProgressCourse key={course.courseId} data={course} permission={user?.permission}/>
                    )}
                    

                    {/*get permision from store so don't need author dash*/}
                    {/* <ProgressCourse /> */}
                    <AddNewCourse />
                </div>
            </div>            
        </div>
    )
}


const AddNewCourse = () => {
    const [visible, setVisible] = useState(false);
    const { control, handleSubmit, register, setValue } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return(
        <div className="dash-add">
            <Button shape="round" className="btn-new-course" onClick={() => setVisible(true)}>New Course</Button>
            <Drawer
                placement='top'
                height="50%"
                title={<p className="title-add-course">Create a new course</p>}
                visible={visible}
                onClose={() => setVisible(false)}
                forceRender={true}
                destroyOnClose={true}
            >
                <form onSubmit={() => handleSubmit(onSubmit)}>
                    <div>
                        <label>Course Name</label>
                        <input {...register("course_name")} required type="text" placeholder="Please type course name"/>
                    </div>
                    <Select className="option-type" defaultValue={"video"} style={{ width: 120 }} >
                        <Select.Option value="video">Video</Select.Option>
                        <Select.Option value="reading">Reading</Select.Option>
                        <Select.Option value="quiz">Quiz</Select.Option>
                        <Select.Option value="video">Video</Select.Option>
                        <Select.Option value="reading">Reading</Select.Option>
                        <Select.Option value="quiz">Quiz</Select.Option>
                        <Select.Option value="video">Video</Select.Option>
                        <Select.Option value="reading">Reading</Select.Option>
                        <Select.Option value="quiz">Quiz</Select.Option>
                        <Select.Option value="video">Video</Select.Option>
                        <Select.Option value="reading">Reading</Select.Option>
                        <Select.Option value="quiz">Quiz</Select.Option>
                        <Select.Option value="video">Video</Select.Option>
                        <Select.Option value="reading">Reading</Select.Option>
                        <Select.Option value="quiz">Quiz</Select.Option>
                    </Select>
                </form>
            </Drawer>
        </div>
    )
}

export default UserDash
