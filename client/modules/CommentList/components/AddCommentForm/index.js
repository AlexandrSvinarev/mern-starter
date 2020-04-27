import React, { Component } from "react";
import { connect } from "react-redux";
import { addComment } from "../../CommentActions";
import styles from "./AddCommentForm.css";

class AddCommentForm extends Component {
	state = {
		isOpen: false,
		authorName: "",
		message: "",
		isDisable: true,
	};

	handleAddComment = () => {
		if (!this.state.isDisable) {
			this.props.dispatch(
				addComment(
					this.props.cuid,
					this.state.authorName,
					this.state.message,
					() => {
						this.setState({
							authorName: "",
							message: "",
							isDisable: true,
							isOpen: false,
						});
					}
				)
			);
		}
	};

	toggleOpenForm = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	handleChange = (name, value) => {
		const obj = {
			authorName: this.state.authorName,
			message: this.state.message,
		};
		obj[name] = value;
		obj.isDisable = !(obj.authorName.length && obj.message.length);
		this.setState(obj);
	};

	render() {
		return (
			<div className={styles.addCommentForm}>
				<div
					className={[styles.button, styles.toggleButton].join(" ")}
					onClick={this.toggleOpenForm}
				>
					{this.state.isOpen
						? "Close Form Add Comment"
						: "Open Form Add Comment"}
				</div>
				{this.state.isOpen && (
					<div className={styles.content}>
						<input
							className={styles.item}
							onChange={(e) => this.handleChange("authorName", e.target.value)}
							value={this.state.authorName}
							placeholder={"author"}
						/>
						<textarea
							className={styles.item}
							onChange={(e) => this.handleChange("message", e.target.value)}
							value={this.state.message}
							placeholder={"message"}
						/>

						<div
							className={[
								styles.button,
								styles.addButton,
								this.state.isDisable ? styles.buttonDisabled : "",
							].join(" ")}
							onClick={this.handleAddComment}
						>
							Add
            </div>
					</div>
				)}
			</div>
		);
	}
}

export default connect()(AddCommentForm);
