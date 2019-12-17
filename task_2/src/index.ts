import * as http from 'http';
import normalizePort from './common/normalizePort';
import app from './app';

const port: number = normalizePort(process.env.PORT) || 3000;
const debug = require('debug')('task_2:server');

const server = http.createServer(app);

server.listen(port, () => {
    debug(`Listening on ${port}`);
});
