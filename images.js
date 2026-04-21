// images.js

const posts = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dujoufris/image/upload/v1769152609/cell_1.png_pfomgd.jpg",
    title: "Cells 🔬",
    desc: "Basic unit of life."
  },
  {
    id: 2,
    img: "https://picsum.photos/600/1000?random=2",
    title: "DNA 🧬",
    desc: "Carries genetic information."
  },
  {
    id: 3,
    img: "https://picsum.photos/600/1000?random=3",
    title: "Brain 🧠",
    desc: "Controls all body functions."
  },
  {
    id: 4,
    img: "https://picsum.photos/600/1000?random=4",
    title: "Photosynthesis 🌱",
    desc: "Plants make food using sunlight."
  },
  {
    id: 5,
    img: "https://picsum.photos/600/1000?random=5",
    title: "Gravity 🌍",
    desc: "Force that pulls objects."
  }
];

// Function to fetch text file and add new post
export async function loadPosts() {
  try {
    const res = await fetch("https://res.cloudinary.com/dujoufris/raw/upload/v1776756005/Here_are_some_important_health_benefits_you_should_know_simple_a..._obagsk.txt");
    const text = await res.text();

    posts.push({
      id: 6,
      img: "https://picsum.photos/600/1000?random=6",
      title: "Health Benefits 💪",
      desc: text
    });

    return posts;
  } catch (error) {
    console.error("Error loading text file:", error);
    return posts;
  }
}
