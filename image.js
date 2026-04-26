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
    url: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

const container = document.getElementById("post-container");

media.forEach((item) => {
  const post = document.createElement("div");
  post.className = "post";

  const box = document.createElement("div");
  box.className = "media-box";

  let mediaElement;

  // IMAGE
  if (item.type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.src = item.url;
    mediaElement.className = "post-img";
    mediaElement.loading = "lazy";
  }

  // VIDEO
  if (item.type === "video") {
    mediaElement = document.createElement("video");
    mediaElement.src = item.url;
    mediaElement.className = "post-video";
    mediaElement.autoplay = true;
    mediaElement.loop = true;
    mediaElement.muted = true;
    mediaElement.playsInline = true;
  }

  // BUTTONS
  const buttons = document.createElement("div");
  buttons.className = "left-buttons";

  const likeBtn = document.createElement("button");
  likeBtn.innerHTML = "❤️";

  let liked = false;
  likeBtn.onclick = () => {
    liked = !liked;
    likeBtn.innerHTML = liked ? "💖" : "❤️";
  };

  const shareBtn = document.createElement("button");
  shareBtn.innerHTML = "🔗";

  shareBtn.onclick = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check this",
        url: item.url
      });
    } else {
      alert("Share not supported");
    }
  };

  buttons.appendChild(likeBtn);
  buttons.appendChild(shareBtn);

  box.appendChild(mediaElement);
  box.appendChild(buttons);

  post.appendChild(box);
  container.appendChild(post);
});
