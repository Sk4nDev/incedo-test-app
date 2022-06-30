import express, { Express, Response } from 'express';
import bodyParser from 'body-parser';
import artistRouter from './routes/artist';
import { getConfigValue } from './config/config';

const port = getConfigValue('SERVER_PORT', 8080);
const app: Express = express();
app.use(bodyParser.json());

app.get('/', ({ res }: { res: Response }): void => {
  res.send({
    success: true,
    message: 'Hello Incedo Services GmbH!'
  });
});
app.use('/artist', artistRouter);

app.get('*', ({ res }: { res: Response }) => {
  res.status(404).send({
    success: false,
    message: 'Not found!'
  });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
