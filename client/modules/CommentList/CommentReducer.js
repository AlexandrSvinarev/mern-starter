import { SET_COMMENTS, CLEAR_COMMENTS } from "./CommentActions";

// Initial State
const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_COMMENTS:
			return {
				data: action.comments || [],
			};

		case CLEAR_COMMENTS:
			return {
				data: [],
			};

		default:
			return state;
	}
};

/* Selectors */


// Get comments by cuid
export const getComments = (state) => state.comments;

// Export Reducer
export default CommentReducer;
