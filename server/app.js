const express = require('express');
const mongoose = require("mongoose");
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');

const PORT = 6006;

mongoose.connect('mongodb+srv://zeromvx:sergey1234@cluster0.0payz.azure.mongodb.net/graph?retryWrites=true&w=majority', {useNewUrlParser: true});

const app = express();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!');
});