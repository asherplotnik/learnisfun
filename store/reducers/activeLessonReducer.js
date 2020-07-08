import {
  SET_ACTIVE_LESSON,
  UPDATE_SCORE,
} from "../actions/activeLessonActions";

const initialState = {
  lesson: 1,
  score: 100,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_LESSON:
      return {
        ...state,
        lesson: action.lesson,
        score: action.score,
      };
    case UPDATE_SCORE:
      const temp = { ...state };
      return {
        ...state,
        score: temp.score + action.amount,
      };
    default:
      return state;
  }
};
