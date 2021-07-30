const initQuiz = (questionData) => {
    let initState = questionData.reduce((acc, question) => {
        acc[question.id] = false;
        return acc;
    }, {});

    return initState;
}
export default initQuiz;