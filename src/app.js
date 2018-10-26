'use strict';
import express from 'express';
import cors from 'cors';
const app = express();
//import tockenCheck from 'lib/middleware/tockenCheck';
import api from 'api';

app.use(express.urlencoded({extended: false}));

app.use(cors());
app.use(api);
//app.use(tokenCheck())
//    .use(api.routes());

export default app;
