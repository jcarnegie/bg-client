import Next from "next";
import app from "./configs/express";

import cors from "./routes/cors";
import pre from "./routes/pre";
import assets from "./routes/assets";
import main from "./routes/main";
import fe from "./routes/fe";

import {sendError} from "./utils/wrapper";

const DEFAULT_PORT = 5000;

app.use(cors);
app.use(pre);
app.use(assets);
app.use(main);
app.use(fe);
app.use(sendError);

  listener = app.listen(process.env.PORT || DEFAULT_PORT, () => {
    console.info(`Express app listening on port ${listener.address().port}`);
  });
});

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

export default app;
