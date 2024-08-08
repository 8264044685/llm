const express = require('express');
const bodyParser = require('body-parser');
// import conversationRoutes from './src/routes/conversationRoutes';
const conversationRoutes = require('./src/routes/conversationRoutes');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use('/api', conversationRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // It's a good practice to terminate the process for uncaught exceptions
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // It's a good practice to terminate the process for unhandled rejections
    process.exit(1);
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});