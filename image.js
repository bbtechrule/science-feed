// ----- ORIGINAL MEDIA DATA -----
const allMedia = [
  {
    type: "video",
    url: "https://res.cloudinary.com/dujoufris/video/upload/v1777429071/VID_20260428_191655_519_u8hkhn.mp4"
  },
  {
    type: "image",
    url: "https://res.cloudinary.com/dujoufris/image/upload/v1777488966/1777488722650_gddqvi.avif"
  },
  {
    type: "video",
    url: "https://res.cloudinary.com/dujoufris/video/upload/v1777402211/VID_20260428_114405_631_lsgfyt.mp4"
  }
];

let container = document.getElementById("post-container");
let currentMedia = [];    // filtered media
let currentIndex = 0;
let startY = 0;
let videos = [];
let soundEnabled = false;

// ----- SOUND BUTTON -----
const soundBtn = document.createElement("div");
soundBtn.id = "sound-toggle";
soundBtn.innerHTML = "🔇";
document.body.appendChild(soundBtn);

function updateAllVideosMuted() {
  videos.forEach(video => {
    video.muted = !soundEnabled;
  });
}

soundBtn.onclick = () => {
  soundEnabled = !soundEnabled;
  updateAllVideosMuted();
  soundBtn.innerHTML = soundEnabled ? "🔊" : "🔇";
};

// ----- RENDER FEED FROM currentMedia -----
function renderFeed() {
  container.innerHTML = "";
  videos = [];

  currentMedia.forEach((item, index) => {
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
    } else if (item.type === "video") {
      mediaElement = document.createElement("video");
      mediaElement.src = item.url;
      mediaElement.className = "post-video";
      mediaElement.autoplay = true;
      mediaElement.loop = true;
      mediaElement.muted = true;
      mediaElement.playsInline = true;
      videos.push(mediaElement);
    }

    box.appendChild(mediaElement);
    post.appendChild(box);
    container.appendChild(post);
  });

  // Re-attach event listeners
  attachSwipeEvents();
  updatePosts();
}

// ----- SWIPE LOGIC -----
let posts = [];

function attachSwipeEvents() {
  posts = document.querySelectorAll(".post");
  container.removeEventListener("touchstart", touchStartHandler);
  container.removeEventListener("touchmove", touchMoveHandler);
  container.removeEventListener("touchend", touchEndHandler);
  container.addEventListener("touchstart", touchStartHandler);
  container.addEventListener("touchmove", touchMoveHandler, { passive: false });
  container.addEventListener("touchend", touchEndHandler);
}

function touchStartHandler(e) {
  startY = e.touches[0].clientY;
}

function touchMoveHandler(e) {
  e.preventDefault();
}

function touchEndHandler(e) {
  let endY = e.changedTouches[0].clientY;
  let diff = startY - endY;
  if (diff > 50) nextPost();
  if (diff < -50) prevPost();
}

function updatePosts() {
  posts.forEach((post, index) => {
    post.style.transform = `translateY(${(index - currentIndex) * 100}%)`;
  });

  videos.forEach(video => video.pause());

  if (currentMedia[currentIndex] && currentMedia[currentIndex].type === "video") {
    const currentVideo = posts[currentIndex]?.querySelector("video");
    if (currentVideo) {
      currentVideo.muted = !soundEnabled;
      currentVideo.play().catch(e => console.log("play error", e));
    }
  }
}

function nextPost() {
  if (currentIndex < posts.length - 1) {
    currentIndex++;
    updatePosts();
  }
}

function prevPost() {
  if (currentIndex > 0) {
    currentIndex--;
    updatePosts();
  }
}

// ----- FILTER FUNCTION -----
function setFilter(type) {
  if (type === "all") {
    currentMedia = [...allMedia];
  } else if (type === "video") {
    currentMedia = allMedia.filter(item => item.type === "video");
  } else if (type === "image") {
    currentMedia = allMedia.filter(item => item.type === "image");
  } else if (type === "profile") {
    // Show profile card (simple view)
    showProfileView();
    return;
  }

  currentIndex = 0;
  renderFeed();
}

// ----- PROFILE VIEW (simple) -----
function showProfileView() {
  container.innerHTML = `
    <div style="color: white; text-align: center; padding: 40px 20px; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <img src="https://img.icons8.com/ios-filled/100/ffffff/user.png" style="width: 80px; margin-bottom: 20px;">
      <h2>@VILLAGE_BOY_2229</h2>
      <p>Shorts UI</p>
      <p style="margin-top: 20px; font-size: 14px;">✨ 12 posts | 45 likes</p>
    </div>
  `;
  // No swipe on profile page
  container.removeEventListener("touchstart", touchStartHandler);
  container.removeEventListener("touchmove", touchMoveHandler);
  container.removeEventListener("touchend", touchEndHandler);
  videos = [];
}

// ----- BOTTOM NAV ACTIVE STATE & HANDLERS -----
function initBottomNav() {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const filter = item.getAttribute("data-filter");
      // Update active class
      navItems.forEach(nav => nav.classList.remove("active"));
      item.classList.add("active");

      if (filter === "profile") {
        setFilter("profile");
      } else {
        setFilter(filter);
      }
    });
  });
}

// ----- INITIAL LOAD (show all) -----
setFilter("all");
initBottomNav();
