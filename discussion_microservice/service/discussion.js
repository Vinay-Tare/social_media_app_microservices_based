import Discussion from "../models/Discussion.js";

const createDiscussionHandler = (req, res) => {
  const userId = req.user;
  const { content, image, tags } = req.body;

  const discussion = new Discussion({
    text: content,
    image,
    hashtags: tags,
    user: userId,
    $inc: { views: 1 }
  });

  discussion.save()
    .then(savedDiscussion => {
      res.status(201).json({ message: 'Discussion started successfully', discussion: savedDiscussion });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

const updateDiscussionHandler = (req, res) => {
  const { discussionId } = req.params;
  if (!discussionId) return res.status(400).json({ message: 'Discussion ID is required' });
  const { content, image, tags } = req.body;

  Discussion.findByIdAndUpdate(discussionId, { text: content, image, hashtags: tags }, { new: true })
    .then(updatedDiscussion => {
      res.status(200).json({ message: 'Discussion updated successfully', discussion: updatedDiscussion });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

const deleteDiscussionHandler = (req, res) => {
  const { discussionId } = req.params;
  if (!discussionId) return res.status(400).json({ message: 'Discussion ID is required' });

  Discussion.findByIdAndDelete(discussionId)
    .then(() => {
      res.status(200).json({ message: 'Discussion deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

const fetchViewsHandler = (req, res) => {
  const { discussionId } = req.params;

  Discussion.findById(discussionId, 'views')
    .then(discussion => {
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' });
      }
      res.json({ views: discussion.views });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

export {
  createDiscussionHandler,
  updateDiscussionHandler,
  deleteDiscussionHandler,
  fetchViewsHandler
};
