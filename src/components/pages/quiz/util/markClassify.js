const markClassify = (questionData) => {
    let marks = questionData.reduce((acc, question) => {
        if((question.type === 'one' && question.userChoice) 
            || (question.type === 'many' && question.userChoices)) {
            acc[question.id] = true;
        }
        else {
            acc[question.id] = false;
        }
        return acc;
    }, {});

    return marks;
}

export default markClassify;