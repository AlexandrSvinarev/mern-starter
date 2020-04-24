import Comment from '../models/comment';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
	Comment.find({ cuid: req.params.cuid })
		.sort("-dateAdded")
		.exec((err, comments) => {
			if (err) {
				res.status(500).send(err);
			}

			res.json({ comments });
		});
}

/**
 * Add a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
	if (
		!req.body.comment.author ||
		!req.body.comment.message ||
		!req.body.comment.cuid
	) {
		res.status(403).end();
		return;
	}

	const newComment = new Comment(req.body.comment);

	newComment.author = sanitizeHtml(newComment.author);
	newComment.message = sanitizeHtml(newComment.message);

	newComment.save((err, saved) => {
		if (err) {
			res.status(500).send(err);
			return;
		}
		res.json({ comment: saved });
	});
}

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
	if (!req.params.id) {
		res.status(403).end();
		return;
	}

	Comment.findById(req.params.id).exec((err, comment) => {
		if (err) {
			res.status(500).send(err);
		}

		comment.remove(() => {
			res.status(200).end();
		});
	});
}

/**
 * Update a comment
 * @param req
 * @param res
 * @returns void
 */
export function updateComment(req, res) {
	if (!req.params.id || !req.body.message) {
		res.status(403).end();
		return;
	}

	Comment.findByIdAndUpdate(
		{ _id: req.params.id },
		{ message: req.body.message }
	).exec((err) => {
		if (err) {
			res.status(500).send(err);
			return;
		}

		res.status(200).end();
	});
}
