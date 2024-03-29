import express from "express";

import {
    watch,
    getEdit,
    upload,
    deleteVideo,
    postEdit,
    getUpload,
    postUpload,
} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

/**videos가 루트URL인 비디오 Router */

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
    .route("/:id([0-9a-f]{24})/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(postEdit);
videoRouter
    .route("/:id([0-9a-f]{24})/delete")
    .all(protectorMiddleware)
    .get(deleteVideo);
videoRouter
    .route("/upload")
    .get(getUpload)
    .all(protectorMiddleware)
    .post(
        videoUpload.fields([{ name: "video" }, { name: "thumb" }]),
        postUpload
    );
videoRouter.get("/upload", upload);

export default videoRouter;
