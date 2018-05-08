import app from "./configs/express";
import assets from "./routes/assets";
import main from "./routes/main";
import {sendError} from "./utils/wrapper";
import fe from "./routes/fe";

const DEFAULT_PORT = 5000;

app.use(assets);
app.use(main);
app.use(fe);
app.use(sendError);

const listener = app.listen(process.env.PORT || DEFAULT_PORT, () => {
  console.info(`Express server listening on port ${listener.address().port}`);
});

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

export default app;
