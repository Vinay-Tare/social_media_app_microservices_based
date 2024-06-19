import Discussion from "../models/Discussion.js";

const searchDiscussionsByText = (req, res) => {
  const { searchText } = req.query;

  Discussion.find({ text: { $regex: searchText, $options: 'i' } })
    .then(discussions => {
      res.status(200).json({ message: `Discussions based on text: ${searchText}`, discussions });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

const searchDiscussionsByTags = (req, res) => {
  const { searchTags } = req.query;

  Discussion.find({ hashtags: { $in: searchTags } })
    .then(discussions => {
      res.status(200).json({ message: `Discussions with tags: ${searchTags}`, discussions });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

export {
  searchDiscussionsByText,
  searchDiscussionsByTags
};
