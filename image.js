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

let currentIndex = 0;
let startY = 0;

// CREATE POSTS
media.forEach((item, index) => {
  const post = document.createElement("div");
  post.className = "post";
  post.style.transform = `translateY(${index * 100}%)`;

  const box = document.createElement("div");
  box.className = "media-box";

  let mediaElement;

  if (item.type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.src = item.url;
    mediaElement.className = "post-img";
  }

  if (item.type === "video") {
    mediaElement = document.createElement("video");
    mediaElement.src = item.url;
    mediaElement.className = "post-video";
    mediaElement.autoplay = true;
    mediaElement.loop = true;
    mediaElement.muted = true;
    mediaElement.playsInline = true;
  }

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

const posts = document.querySelectorAll(".post");

// TOUCH EVENTS
container.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

container.addEventListener("touchend", (e) => {
  let endY = e.changedTouches[0].clientY;
  let diff = startY - endY;

  if (diff > 50) nextPost();     // swipe up
  if (diff < -50) prevPost();    // swipe down
});

// UPDATE POSITION
function updatePosts() {
  posts.forEach((post, index) => {
    post.style.transform = `translateY(${(index - currentIndex) * 100}%)`;
  });
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
