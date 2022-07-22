const User = require('../schemes/User');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({
      userName: userName,
    });
    if (user === null) {
      res
        .status(400)
        .send({ success: false, message: 'Invalid username or password' });
    } else {
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).send({
          success: true,
          message: 'Authorized',
          user: user,
        });
      } else {
        res
          .status(400)
          .send({ success: false, message: 'Invalid username or password' });
      }
    }
  } catch (err) {
    return err;
  }
};

const registerUser = async (req, res) => {
  const { userName, password } = req.body;
  const existingUser = await User.find({ userName: userName });
  try {
    if (existingUser.length > 0) {
      return res.status(409).send({
        success: false,
        message: 'User exists',
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const user = await User.create({
        userName: userName,
        password: await bcrypt.hash(password, salt),
      });

      await user.save();
      res.status(200).send({
        success: true,
        message: 'Successfully created',
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
};
