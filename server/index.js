const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const prodctRoutes = require('./routes/produto');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/produto', prodctRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/user', express.static(path.join(__dirname, 'uploads/user')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));