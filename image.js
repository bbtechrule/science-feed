const images = [
  "https://res.cloudinary.com/dujoufris/image/upload/v1769147997/cld-sample-5.jpg",
  "https://res.cloudinary.com/dujoufris/image/upload/v1769152609/cell_1.png_pfomgd.jpg",
  "https://res.cloudinary.com/demo/image/upload/sample.jpg"
];

const container = document.getElementById("post-container");

images.forEach((url) => {
  const post = document.createElement("div");
  post.className = "post";

  const img = document.createElement("img");
  img.src = url;
  img.className = "post-img";

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
        url: url
      });
    } else {
      alert("Share not supported");
    }
  };

  buttons.appendChild(likeBtn);
  buttons.appendChild(shareBtn);

  post.appendChild(img);
  post.appendChild(buttons);

  container.appendChild(post);
});
