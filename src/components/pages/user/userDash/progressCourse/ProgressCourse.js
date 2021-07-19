import React from 'react'
import './ProgressCourse.css'
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress'

const LinearProgressCourse = withStyles((theme) => ({
    root: {
      height: 15,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#36d1dc',
    },
  }))(LinearProgress);

const ProgressCourse = () => {
    return (
        <div className="progress-course">
            <div className="progress-course-wrap">
                <div className="progress-course-left">
                    <a href="/">
                        <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/e4/3283d04d0111e5970145eef7ee0b59/gears-818461_1280.jpg?auto=format&dpr=1&w=100&h=100&fit=clamp" alt=""/>

                    </a>
                </div>
                <div className="progress-course-right">
                    <div className="course-info">
                        <div className="course-desc">
                            <a href="/">
                                <h3 className="p-course-title">Machine Learning Foundations: A Case Study Approach</h3>
                                <p className="p-course-author">University of Washington</p>
                            </a>
                        </div>
                        <div className="progress-info">
                            <p>Progress</p>
                            <LinearProgressCourse variant="determinate" value={30}/>
                        </div>
                    </div>
                    <div className="progress-course-btn">
                        <a href='/'>
                            <button className="resume-btn">RESUME</button>

                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressCourse
