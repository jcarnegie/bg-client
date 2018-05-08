import path from "path";
import {Router} from "express";


const router = Router(); // eslint-disable-line new-cap

router.route("/ping")
  .get((request, response) => {
    response.status(200).json({pong: true});
  });

router.route("/favicon.png")
  .get((request, response) => {
    response.sendFile(path.join(__dirname, "../../static/favicon.png"));
  });

export default router;
