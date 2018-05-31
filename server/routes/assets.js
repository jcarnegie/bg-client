import path from "path";
import express, {Router} from "express";
import webpack from "../configs/webpack";

const router = Router(); // eslint-disable-line new-cap

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  router.use(webpack);
} else {
  router.use("/bundle", express.static(path.join(__dirname, "../../bundle")));
}

router.use("/", express.static(path.join(__dirname, "../../static")));

export default router;
