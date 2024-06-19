import User from "../models/User.js";

const followUserHandler = (req, res) => {
  const { followedUserId } = req.params;

  User.findById(followedUserId)
    .then(followedUser => {
      if (!followedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      User.findById(req.user)
        .then(currentUser => {
          if (currentUser.following.includes(followedUserId)) {
            return res.status(400).json({ message: 'You are already following this user' });
          }

          currentUser.updateOne({ $push: { following: followedUserId } })
            .then(() => {
              followedUser.updateOne({ $push: { followers: req.user } })
                .then(() => {
                  res.status(200).json({ message: 'User followed successfully!' });
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
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

export default followUserHandler;
