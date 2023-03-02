import { model } from "mongoose";
import movieModel from "../models/Video";

// 이곳은 video에 관련된 Controller가 모여있는 페이지 입니다.
// 링크에 연결되는 직접적으로 동작하는 함수가 존재합니다.

export const home = async (req, res) => {
  const videos = await movieModel.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

//watch, video페이지
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await movieModel.findById(id);
  if (video) {
    res.render("watch", { pageTitle: video.title, video });
  }
  return res.render("404", { pageTitle: "Video not found" });
};


//Edit페이지 파트
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await movieModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await movieModel.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  await movieModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: movieModel.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};


//upload페이지
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await movieModel.create({
      title,
      description,
      hashtags: movieModel.formatHashtags(hashtags),
    });
    return res.redirect(`/`);
  } catch (error) {
    return res
      .status(400)
      .render("upload", {
        pageTitle: `Upload Video`,
        errorMessage: error._message,
      });
  }
};


//delete페이지
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await movieModel.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await movieModel.find({
      title: {
        $regex: new RegExp(`^${keyword}`, "i"),
      },
    });
  }
  res.render("search", { pageTitle: `Search`, videos });
};


export const upload = (req, res) => res.send("Upload video!");
