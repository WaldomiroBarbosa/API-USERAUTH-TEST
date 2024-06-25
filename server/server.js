 const express = require('express');
  const mongoose = require('mongoose');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const cors = require('cors');
  const authController = require('./controllers/auth');
  
  const app = express();
  const PORT = process.env.PORT || 3001;
  const SECRET = process.env.SECRET || '2602199219091998euphonium';
  
  mongoose.connect('mongodb+srv://waldomiro:TVF8HsEnZR2vgBID@walcluster.x8inmgu.mongodb.net/?retryWrites=true&w=majority&appName=WalCluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  app.use(cors());
  app.use(express.json());
  
  app.post('/register', authController.registerUser);
  app.post('/login', authController.loginUser);
  
  app.get('/home', authController.verifyJWT, async (req, res) => {
    try {
      const user = await User.findById(req.userId).catch((error) => {
        console.error('Erro ao buscar usuário no banco de dados:', error);
        throw error;
      });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      res.json({ username: user.username });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
  });