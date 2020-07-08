export const SET_ACTIVE_LESSON = "SET_LESSON";
export const UPDATE_SCORE = "UPDATE_SCORE";

export const setActiveLesson = (lesson, score) => {
  return (dispatch) => {
    dispatch({ type: SET_ACTIVE_LESSON, lesson: lesson, score: score });
  };
};

export const updateScore = (amount) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_SCORE, amount: amount });
  };
};
