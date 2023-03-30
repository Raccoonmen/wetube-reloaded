const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

//vidoePlayer sections
//Code for actions on buttons and video controllers

const handlePlayClick = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtnIcon.classList = video.muted
        ? "fas fa-volume-mute"
        : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
    const {
        target: { value },
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtnIcon.classList = "fas fa-volume-up";
    }
    if (value == 0) {
        muteBtnIcon.classList = "fas fa-volume-mute";
    }
    if (volumeRange.value != 0) {
        muteBtnIcon.classList = "fas fa-volume-up";
    }
    volumeValue = value;
    video.volume = value;
};

const formatTime = (seconds) =>
    new Date(seconds * 1000).toISOString().substring(14, 19);

const handleLoadedMetadata = (seconds) => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = (seconds) => {
    currenTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
    const {
        target: { value },
    } = event;
    video.currentTime = value;
};

const handleFullscreen = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
        document.exitFullscreen();
    } else {
        videoContainer.requestFullscreen();
    }
};

const handleFullScreenBtn = (event) => {
    const fullScreen = document.fullscreenElement;
    if (fullScreen) {
        fullScreenIcon.classList = "fas fa-expand";
    } else {
        fullScreenIcon.classList = "fas fa-compress";
    }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleViews = () => {
    const { id } = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`, {
        method: "POST",
    });
};

const handleMouseMove = () => {
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if (controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 2000);
};

const handleEnded = () => {
    playBtnIcon.classList = "fas fa-play";
    video.paused = video.pause();
};

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 2000);
};

const changeVideoTime = (seconds) => {
    video.currentTime += seconds;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
video.addEventListener("ended", handleEnded);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("loadedmetadata", handleViews);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("fullscreenchange", handleFullScreenBtn);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handlePlayClick);
document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        handlePlayClick();
    }
    if (event.code === "ArrowRight") {
        changeVideoTime(5);
    }
    if (event.code === "ArrowLeft") {
        changeVideoTime(-5);
    }
    if (event.code === "KeyF") {
        handleFullscreen();
    }
});
