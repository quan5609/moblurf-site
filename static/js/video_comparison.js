// Written by Dor Verbin, October 2021
// This is based on: http://thenewcode.com/364/Interactive-Before-and-After-Video-Comparison-in-HTML5-Canvas
// With additional modifications based on: https://jsfiddle.net/7sk5k4gp/13/

function playVids(videoId) {
  var videoMerge = document.getElementById(videoId + "Merge");
  var vid = document.getElementById(videoId);

  var position = 0.5;
  var vidWidth = vid.videoWidth;
  var vidHeight = vid.videoHeight;
  var widthRatio = 800 / vidWidth;
  videoMerge.width = 800;
  videoMerge.height *= widthRatio;

  var mergeContext = videoMerge.getContext("2d");

  if (vid.readyState > 3) {
    // vid.play();

    function trackLocation(e) {
      // Normalize to [0, 1]
      bcr = videoMerge.getBoundingClientRect();
      console.log(e.pageX, bcr.width);
      position = (e.pageX - bcr.x) / bcr.width;
    }
    function trackLocationTouch(e) {
      // Normalize to [0, 1]
      bcr = videoMerge.getBoundingClientRect();
      position = (e.touches[0].pageX - bcr.x) / bcr.width;
    }

    videoMerge.addEventListener("mousemove", trackLocation, false);
    videoMerge.addEventListener("touchstart", trackLocationTouch, false);
    videoMerge.addEventListener("touchmove", trackLocationTouch, false);
    // videoMerge.addEventListener("click", trackClick, false);

    function drawLoop() {
      mergeContext.drawImage(
        vid,
        0,
        0,
        vidWidth,
        vidHeight,
        0,
        0,
        vidWidth * widthRatio,
        vidHeight * widthRatio
      );
      var colStart = (vidWidth * position).clamp(0.0, vidWidth);
      var colWidth = (vidWidth - vidWidth * position).clamp(0.0, vidWidth);
      mergeContext.drawImage(
        vid,
        colStart + vidWidth,
        0,
        colWidth,
        vidHeight,
        colStart * widthRatio,
        0,
        colWidth * widthRatio,
        vidHeight * widthRatio
      );
      requestAnimationFrame(drawLoop);

      mergeContext.fillStyle = "#AAAAAA";
      mergeContext.fill();

      mergeContext.fillStyle = "rgba(255, 255, 255, 0.4)";
      mergeContext.fillRect(
        (vidWidth * widthRatio) / 2 - 160,
        vidHeight * widthRatio * 0.885,
        320,
        vidHeight * widthRatio * 0.12
      );

      mergeContext.fillStyle = "#000000";
      mergeContext.textAlign = "center";
      mergeContext.font = "25px Arial";
      mergeContext.fillText(
        "Click to Pause or Resume",
        (vidWidth * widthRatio) / 2,
        vidHeight * widthRatio * 0.95
      );
    }
    requestAnimationFrame(drawLoop);
  }
}

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

function resizeAndPlay(element) {
  var cv = document.getElementById(element.id + "Merge");
  cv.width = element.videoWidth / 2;
  cv.height = element.videoHeight;
  element.style.height = "0px"; // Hide video without stopping it

  playVids(element.id);
}

var videoInitialized_iphone_nvs = false;
var videoInitialized_stereo_nvs = false;

function initVideo_iphone_nvs() {
  if (videoInitialized_iphone_nvs === true) {
    return;
  }
  videoInitialized_iphone_nvs = true;
  vid = document.getElementById("iphone_nvs");
  var cv = document.getElementById(vid.id + "Merge");
  cv.width = vid.videoWidth / 2;
  cv.height = vid.videoHeight;
  vid.play();
  vid.style.height = "0px"; // Hide video without stopping it
  playVids(vid.id);
}

function changeVideo(videoSrc) {
  vid = document.getElementById("viz_input");
  vid.src = videoSrc;
  vid.play();
}

function togglePlay() {
  vid = document.getElementById("viz_input");
  if (vid.paused) {
    vid.play();
  } else {
    vid.pause();
  }
}

function changeVideo_iphone_nvs(novelviewSrc, scene) {
  vid = document.getElementById("iphone_nvs");
  vid.src = novelviewSrc;
  vid.play();

  // Remove the 'button-17-selected' class from all buttons
  var buttons = document.querySelectorAll(".button-19");
  buttons.forEach(function (button) {
    button.classList.remove("button-19-selected");
  });

  // Add the 'button-17-selected' class to the clicked button
  var selectedButton = document.getElementById("btn_iphone_nvs_" + scene);
  selectedButton.classList.add("button-19-selected");
}

function changeVideo_stereo_nvs(novelviewSrc, scene) {
  vid = document.getElementById("stereo_nvs");
  vid.src = novelviewSrc;
  vid.play();

  // Remove the 'button-17-selected' class from all buttons
  var buttons = document.querySelectorAll(".button-20");
  buttons.forEach(function (button) {
    button.classList.remove("button-20-selected");
  });

  // Add the 'button-17-selected' class to the clicked button
  var selectedButton = document.getElementById("btn_stereo_nvs_" + scene);
  selectedButton.classList.add("button-20-selected");
}

function changeImage_quantitative(imagePath, scene) {
  const img = document.getElementById("stereo_img");
  img.src = imagePath;

  const buttons = document.querySelectorAll(".image-select .button-20");
  buttons.forEach(function (button) {
    button.classList.remove("button-20-selected");
  });

  const selectedButton = document.getElementById("btn_" + scene);
  if (selectedButton) {
    selectedButton.classList.add("button-20-selected");
  }
}


function initVideo_stereo_nvs() {
  if (videoInitialized_stereo_nvs === true) {
    return;
  }
  videoInitialized_stereo_nvs = true;
  vid = document.getElementById("stereo_nvs");
  var cv = document.getElementById(vid.id + "Merge");
  cv.width = vid.videoWidth / 2;
  cv.height = vid.videoHeight;
  vid.play();
  vid.style.height = "0px"; // Hide video without stopping it
  playVids(vid.id);
}

function togglePlay_byname(name) {
  vid = document.getElementById(name);
  if (vid.paused) {
    vid.play();
  } else {
    vid.pause();
  }
}
