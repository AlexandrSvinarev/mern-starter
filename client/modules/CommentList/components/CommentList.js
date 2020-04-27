import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	fetchComments,
	clearComments,
	deleteCommentRequest,
	updateComment,
} from "../CommentActions";
import { getComments } from "../CommentReducer";
import AddCommentForm from "./AddCommentForm";
import styles from "./CommentList.css";

class CommentList extends Component {
	state = {
		idEdit: null,
		message: "",
	};

	componentDidMount() {
		this.props.dispatch(fetchComments(this.props.cuid));
	}

	componentWillUnmount() {
		this.props.dispatch(clearComments());
	}

	handleDeleteComment(id) {
		this.props.dispatch(deleteCommentRequest(id, this.props.cuid));
	}

	handleEdit = (id, value) => {
		this.setState({ idEdit: id, message: value });
	};

	handleEditCancel = () => {
		this.setState({ idEdit: null, message: "" });
	};

	handleUpdate = () => {
		this.props.dispatch(
			updateComment(this.state.idEdit, this.props.cuid, this.state.message)
		);
		this.setState({ idEdit: null, message: "" });
	};

	render() {
		return (
			<div className={styles.container}>
				<AddCommentForm cuid={this.props.cuid} />

				{this.props.comments.data.map((comment) => {
					return (
						<div className={styles.comment} key={comment._id}>
							<div>
								<b>{comment.author}:</b>
							</div>
							{this.state.idEdit !== comment._id ? (
								<div>{comment.message}</div>
							) : (
									<textarea
										className={styles.message}
										onChange={(e) => this.setState({ message: e.target.value })}
										value={this.state.message}
										placeholder="message"
									/>
								)}

							<div className={styles.actions}>
								{this.state.idEdit !== comment._id ? (
									<Fragment>
										<div
											className={styles.buttonAction}
											onClick={() => this.handleDeleteComment(comment._id)}
										>
											Delete
                    </div>
										<div
											className={styles.buttonAction}
											onClick={() =>
												this.handleEdit(comment._id, comment.message)
											}
										>
											Edit
                    </div>
									</Fragment>
								) : (
										<Fragment>
											<div
												className={styles.buttonAction}
												onClick={() => this.handleEditCancel()}
											>
												Cancel
                    </div>
											<div
												className={styles.buttonAction}
												onClick={() => this.handleUpdate()}
											>
												Save
                    </div>
										</Fragment>
									)}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

// Actions required to provide data for this component to render in server side.
CommentList.need = [
	(params) => {
		return fetchComments(params.cuid);
	},
];

function mapStateToProps(state, props) {
	return {
		comments: getComments(state, props.cuid),
	};
}

CommentList.propTypes = {
	comments: PropTypes.shape({ data: PropTypes.array.isRequired }).isRequired,
	dispatch: PropTypes.func.isRequired,
	cuid: PropTypes.string.isRequired,
	// handleDeletePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(CommentList);
