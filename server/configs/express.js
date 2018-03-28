import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";


const app = express();

app.disable("x-powered-by");
app.enable("trust proxy");

app.use(fileUpload());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(morgan("tiny")); // "default", "short", "tiny", "dev"

export default app;
