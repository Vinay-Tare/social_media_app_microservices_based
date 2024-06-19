import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const saltRounds = 10;

const registerUserHandler = (req, res) => {
  const { name: userName, mobileNumber: userMobileNumber, email: userEmail, password: userPassword } = req.body;
  bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to hash password' });
    }
    const newUser = new User({
      name: userName,
      mobileNumber: userMobileNumber,
      email: userEmail,
      password: hashedPassword
    });
    newUser.save()
      .then(savedUser => {
        res.status(201).json({ message: 'User registered successfully!', user: savedUser });
      })
      .catch(error => {
        res.status(400).json({ error: error.message });
      });
  });
};

const loginUserHandler = (req, res) => {
  const secretKey = process.env.JWT_SECRET_KEY || '123456789';
  const expiresIn = process.env.JWT_EXPIRY_TIME || '2h';
  const { email: userEmail, password: userPassword } = req.body;
  User.findOne({ email: userEmail }).select('+password')
    .then(foundUser => {
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      bcrypt.compare(userPassword, foundUser.password, (err, isMatch) => {
        if (err) {
          throw new Error('Password comparison failed');
        }
        if (isMatch) {
          const token = jwt.sign({ userId: foundUser._id }, secretKey, { expiresIn });
          res.json({ token, message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

const getAllRegisteredUsersHandler = (req, res) => {
  User.find()
    .then(users => {
      res.json({ message: "List of all users", users });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

const updateUserDetailsHandler = (req, res) => {
  const { userId: userIdParam } = req.params;

  if (!userIdParam) return res.status(400).json({ message: 'User ID is required' });

  const { name: userName, mobileNumber: userMobileNumber, email: userEmail } = req.body;
  User.findByIdAndUpdate(userIdParam, { name: userName, mobileNumber: userMobileNumber, email: userEmail }, { new: true })
    .then(updatedUser => {
      res.json({ message: 'User details updated', user: updatedUser });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });
};

const deleteUserByIdHandler = (req, res) => {
  const { userId: userIdParam } = req.params;

  if (!userIdParam) return res.status(400).json({ message: 'User ID is required' });

  User.findByIdAndDelete(userIdParam)
    .then(deletedUser => {
      res.json({ message: 'User deleted', user: deletedUser });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

export {
  registerUserHandler,
  loginUserHandler,
  getAllRegisteredUsersHandler,
  updateUserDetailsHandler,
  deleteUserByIdHandler
};
