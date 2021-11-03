import React,  { useState } from 'react'
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/theme-monokai"

function onChange(newValue) {
  console.log("change", newValue);
}

const CodeEditor = () => {
    const [languageProgram, setLanguageProgram] = useState('javascript');
    console.log("re-render in code")
    return (
        <div>
            <AceEditor
                placeholder="Placeholder Text"
                mode="javascript"
                theme="monokai"
                name="blah2"
                onChange={onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
                }}
            />
        
        </div>
    )
}

export default CodeEditor
