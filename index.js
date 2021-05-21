const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { mogoUrl } = require('./keys.js');

require('./models/Content.js');
const contentRoutes = require('./routes/contentRoutes.js'); 

require('./models/User.js');
const authRoutes = require('./routes/authRoutes.js');
const requireToken = require('./middleware/requireToken.js');

app.use(bodyParser.json());
app.use(authRoutes);
app.use(contentRoutes);

mongoose.connect(mogoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo');
});
mongoose.connection.on('error', (err) => {
    console.log(`This is error ${err}`);
});

app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send({email:req.user});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
}); 