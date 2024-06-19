import Comment from "../models/Comment.js";
import Discussion from "../models/Discussion.js";

const createCommentHandler = (req, res) => {
  const { content, discussionId } = req.body;
  const newComment = new Comment({ content, discussion: discussionId, user: req.user });

  newComment.save()
    .then(comment => {
      return Discussion.findByIdAndUpdate(discussionId, {
        $push: { comments: comment._id },
        $inc: { views: 1 }
      });
    })
    .then(() => {
      res.status(201).json({ message: 'Comment created successfully!' });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
};

const updateCommentHandler = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  Comment.findByIdAndUpdate(id, { content }, { new: true })
    .then(updatedComment => {
      if (!updatedComment) {
        throw new Error('Comment not found');
      }
      res.status(200).json({ message: 'Comment updated successfully!', updatedComment });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
};

const deleteCommentHandler = (req, res) => {
  const { id } = req.params;

  Comment.findByIdAndDelete(id)
    .then(deletedComment => {
      if (!deletedComment) {
        throw new Error('Comment not found');
      }
      return Discussion.findByIdAndUpdate(req.body.discussionId, {
        $pull: { comments: id },
      });
    })
    .then(() => {
      res.status(200).json({ message: 'Comment deleted successfully!' });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
};

const replyToCommentHandler = (req, res) => {
  const { content } = req.body;
  const { commentId } = req.params;
  const userId = req.user;

  const newReply = new Comment({ user: userId, content });

  newReply.save()
    .then(savedReply => {
      return Comment.findById(commentId)
        .then(parentComment => {
          if (!parentComment) {
            throw new Error('Parent comment not found');
          }
          parentComment.replies.push(savedReply._id);
          return parentComment.save();
        });
    })
    .then(parentComment => {
      res.status(201).json(parentComment);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

export {
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
  replyToCommentHandler
};
