import React, { useState, useEffect } from 'react'
import './Filter.scss'
import { Collapse, Checkbox } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string'

const options = [
    { type: "language", queryParam: "lang", content: ["vietnamese", "english", "potago", "chinese"] },
    { type: "topic", queryParam: "topic", content: ["java", "python", "JavaScript", "ruby"] },
    { type: "level", queryParam: "level", content: ["all levels", "beginner", "intermediate", "expert"] },
    { type: "features", queryParam: "features", content: ["subtitles", "quizzes", "practice tests"] },
]

const Filter = () => {
    const location = useLocation();
    const [filter, setFilter] = useState([]);
    const history = useHistory();
    
    const onChange = async (queryParam, checkedValues) => {
        console.log("checkedValues: ", checkedValues);
        const currentQuery = qs.parse(location.search);
        console.log("current: ", currentQuery);
        currentQuery[queryParam] = checkedValues;
        console.log("new: ", currentQuery);
        
        history.push(`/search/?${qs.stringify(currentQuery)}`);
        
    }

    useEffect(() => {
        let filterOpt = options.map(opt => ({
            type: opt.type,
            queryParam: opt.queryParam,
            content: opt.content.map(cnt => ({
                label: cnt,
                value: cnt,
            }))

        }));
        setFilter(filterOpt);
        console.log('opt: ', filterOpt);
    }, [options]);

    return (
        <Collapse 
            className="filter-collapse"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />} 
            bordered={false}
        >
            {filter && filter.map((opt, index) => 
                <Collapse.Panel key={index} className="f-c-panel" header={opt.type}>
                    <Checkbox.Group 
                        defaultValue={[].concat(qs.parse(location.search)[opt.queryParam])}
                        options={opt.content} 
                        onChange={(checkedValues) => onChange(opt.queryParam, checkedValues)} 
                    />
                </Collapse.Panel>
            )}

        </Collapse>
    )
}

export default Filter
