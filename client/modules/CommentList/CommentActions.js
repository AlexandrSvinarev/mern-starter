import callApi from "../../util/apiCaller";

// Export Constants
export const SET_COMMENTS = "SET_COMMENTS";
export const ADD_POSTS = "ADD_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const CLEAR_COMMENTS = "CLEAR_COMMENTS";

// Export Actions
export function setComments(comments) {
	return {
		type: SET_COMMENTS,
		comments,
	};
}

export function clearComments() {
	return {
		type: CLEAR_COMMENTS,
	};
}

export function fetchComments(cuid) {
	return (dispatch) =>
		callApi(`comments/${cuid}`).then((res) => {
			return dispatch(setComments(res.comments));
		});
}

export function deleteCommentRequest(id, cuid) {
	return (dispatch) => {
		return callApi(`comments/${id}`, "delete").then(() =>
			dispatch(fetchComments(cuid))
		);
	};
}

export function updateComment(id, cuid, message) {
	return (dispatch) => {
		return callApi(`comments/${id}`, "put", {
			message,
		}).then(() => dispatch(fetchComments(cuid)));
	};
}

export function addComment(cuid, author, message, callback) {
	return (dispatch) => {
		return callApi("comments", "post", {
			comment: {
				cuid,
				author,
				message,
			},
		}).then(() => {
			callback();

			return dispatch(fetchComments(cuid));
		});
	};
}
