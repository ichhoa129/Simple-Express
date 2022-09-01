import 'dotenv/config';
import express from 'express';
import { swagger } from 'services';
import {
    errorHandle,
    notFoundHandle,
    logErrors,
} from './helpers/handle-errors';
import routers from './api';
import { connectDatabase } from './database'

const app = express();

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routers);
app.use('/api-docs', swagger());
// catch 404 and forward to error handler
app.use(notFoundHandle);
app.use(logErrors);
app.use(errorHandle);

module.exports = app;
