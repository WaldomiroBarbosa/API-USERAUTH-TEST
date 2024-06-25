const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (user) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(user.password, salt);

    const newUser = new User({
      username: user.username,
      email: user.email,
      userpwd: hashedPwd,
      usertype: user.usertype || 'common',
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (credentials) => {
  try {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.userpwd);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    const id = user._id;
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '1h' });
    return { token: token };
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser };