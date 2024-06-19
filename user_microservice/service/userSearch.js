import User from "../models/User.js";

const searchUserByNameHandler = (req, res) => {
  const { name } = req.query;

  User.find({ name: { $regex: name, $options: 'i' } })
    .then(users => {
      res.json({ message: `Users found with name ${name}`, users });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

export { searchUserByNameHandler };
