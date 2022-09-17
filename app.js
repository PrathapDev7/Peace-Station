import { port } from './config/environment';
import graphqlServer from './app/graphql';
import express from 'express';
import connectDB from './config/database';
import { graphqlUploadExpress } from 'graphql-upload';
const bodyParser = require('body-parser');
const cron = require('node-cron');

const cors = require('cors');
const start = async () => {
  try {
    await connectDB();
    await graphqlServer.start();
    const app = express();
    app.use(graphqlUploadExpress());
    app.use(cors());
    app.use(bodyParser.json({
      extended: true,
      limit: '100mb'
    }));

    graphqlServer.applyMiddleware({
      app
    });
    await app.listen(port);
    console.log(`🚀  GraphQL server running at port: ${port}`);
  } catch (error) {
    console.log(error);
    console.log('Not able to run GraphQL server');
  }
};

start();
