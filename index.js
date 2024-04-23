const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open',()=>console.log("Connected to Database"))
// Define User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

// Handle Signup POST request
// Handle Signup POST request
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.sendFile(__dirname + '/success.html');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error signing up');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
