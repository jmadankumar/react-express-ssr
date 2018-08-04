import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import manifestHelpers from 'express-manifest-helpers';
import paths from '../../config/paths';
import ServerRender from './render';

const app = express();
const PORT = 8444;

app.use(cors());

app.use(bodyParser());

const manifestPath = path.join(paths.buildClient, paths.publicPath);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    })
);

app.use(ServerRender());
console.log("we are in index.js");
app.listen(PORT, () => {
    console.log(`Starting the server @ port: ${PORT}`);
});
console.log("we are in index.js end");
module.exports = app;