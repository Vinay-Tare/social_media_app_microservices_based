import Discussion from "../models/Discussion.js";
import Comment from "../models/Comment.js";
import Like from "../models/Like.js";

const createLikeHandler = (req, res) => {
  const { likedEntityId, likedEntityType } = req.body;
  const userId = req.user;

  // Determine which model to use based on likedEntityType
  const EntityModel = likedEntityType === 'Discussion' ? Discussion : Comment;

  Like.findOne({ user: userId, likedEntity: likedEntityId, likedEntityType })
    .then(existingLike => {
      if (existingLike) {
        return res.status(400).json({ message: `You have already liked this ${likedEntityType}` });
      }

      const like = new Like({ user: userId, likedEntity: likedEntityId, likedEntityType });
      like.save()
        .then(() => {
          // Update the discussion or comment entity (if needed)
          EntityModel.findByIdAndUpdate(likedEntityId, {
            $push: { likes: like._id },
            $inc: { views: 1 }
          })
            .then(() => {
              res.status(201).json({ message: 'Like added', like });
            })
            .catch(error => {
              res.status(500).json({ error: error.message });
            });
        })
        .catch(error => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

const deleteLikeHandler = (req, res) => {
  const { likeId } = req.params;
  const userId = req.user;

  // Find and delete the like
  Like.findOneAndDelete({ _id: likeId, user: userId })
    .then(removeLike => {
      if (!removeLike) {
        return res.status(400).json({ message: 'Like not found' });
      }
      res.status(200).json({ message: 'Like removed', removeLike });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

export { createLikeHandler, deleteLikeHandler };
