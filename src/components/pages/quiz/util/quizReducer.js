const quizReducer = (state, action) => {
    console.log("in quizReducer: ", action)
    switch (action.type) {
        case 'MARK':
            let idQuestion = action.idQuestion;
            
            if (state[idQuestion] === false) {
                let stateClone = { ...state };
                stateClone[idQuestion] = true;
                return stateClone;
            }
            else return state;
    
        default:
            break;
    }
}

export default quizReducer;