const AppError = require('../utils/appError');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res, next) => {
  res.send('Finding All Users Route');
};

exports.getUserById = async (req, res, next) => {
  res.send('Finding User by Id Route');
};

exports.updateUserById = async (req, res, next) => {
  res.send('Updating User by Id Route');
};

exports.deleteUserById = async (req, res, next) => {
  res.send('Deleting User by Id Route');
};

exports.getLoggedInUser = async (req, res, next) => {
  console.log(req.query);
  const { token } = req.query;

  if (!token) {
    return next(new AppError('Not Token', 401));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    return next(new AppError('Invalid Token', 403));
  }

  try {
    const user = await User.findOne({
      id: decodedToken.id,
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({ user });
  } catch (error) {
    next(new AppError('Login Error - view logs', 500));
    console.error(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 401));
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return next(new AppError('Invalid Credentials', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError('Invalid Credentials', 401));
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({ token, user });
  } catch (error) {
    next(new AppError('Login Error - view logs', 500));
    console.error(error);
  }
};

exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  console.log({ username, email, password });

  if (!username || !email || !password) {
    return next(
      new AppError('Please provide username, email, and password', 401)
    );
  }

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  console.log({ user });

  if (user) {
    return next(new AppError('User already exists', 401));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    let payload = {
      id: newUser.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ token });
  } catch (error) {
    next(new AppError('Login Error - view logs', 500));
    console.error(error);
  }
};
