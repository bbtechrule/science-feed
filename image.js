const media = [
  {
    type: "image",
    url: "https://res.cloudinary.com/dujoufris/image/upload/v1769147997/cld-sample-5.jpg"
  },
  {
    type: "image",
    url: "https://res.cloudinary.com/dujoufris/image/upload/v1769152609/cell_1.png_pfomgd.jpg"
  },
  {
    type: "video",
    url: "https://res.cloudinary.com/dujoufris/video/upload/v1777402211/VID_20260428_114405_631_lsgfyt.mp4"
  }
];

const container = document.getElementById("post-container");

let currentIndex = 0;
let startY = 0;
let videos = []; // store all videos

// CREATE POSTS
media.forEach((item, index) => {
  const post = document.createElement("div");
  post.className = "post";
  post.style.transform = `translateY(${index * 100}%)`;

  const box = document.createElement("div");
  box.className = "media-box";

  let mediaElement;

  // IMAGE
  if (item.type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.src = item.url;
    mediaElement.className = "post-img";
  }

  // VIDEO
  if (item.type === "video") {
    mediaElement = document.createElement("video");
    mediaElement.src = item.url;
    mediaElement.className = "post-video";

    mediaElement.autoplay = true;
    mediaElement.loop = true;
    mediaElement.muted = true; // start muted
    mediaElement.playsInline = true;

    // store video
    videos.push(mediaElement);

    // 🔊 Tap to toggle sound
    mediaElement.addEventListener("click", () => {
      mediaElement.muted = !mediaElement.muted;
    });
  }

  box.appendChild(mediaElement);
  post.appendChild(box);
  container.appendChild(post);
});

const posts = document.querySelectorAll(".post");

// TOUCH EVENTS
container.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

container.addEventListener("touchend", (e) => {
  let endY = e.changedTouches[0].clientY;
  let diff = startY - endY;

  if (diff > 50) nextPost();
  if (diff < -50) prevPost();
});

// UPDATE POSTS + VIDEO CONTROL
function updatePosts() {
  posts.forEach((post, index) => {
    post.style.transform = `translateY(${(index - currentIndex) * 100}%)`;
  });

  // 🎬 control videos
  videos.forEach((video) => {
    video.pause();
  });

  const currentPost = posts[currentIndex];
  const currentVideo = currentPost.querySelector("video");

  if (currentVideo) {
    currentVideo.play();
  }
}

// NEXT
function nextPost() {
  if (currentIndex < posts.length - 1) {
    currentIndex++;
    updatePosts();
  }
}

// PREV
function prevPost() {
  if (currentIndex > 0) {
    currentIndex--;
    updatePosts();
  }
}
