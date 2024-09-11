const express = require("express");
const { readPostsData, writePostsData, validatePost } = require("../utils/fileOperations");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// إعدادات multer للرفع
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// جلب جميع البوستات
router.get("/", (req, res) => {
  try {
    const postsData = readPostsData();
    res.json(postsData.posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
});

// إضافة بوست جديد
router.post("/", upload.single("image"), authenticateToken, (req, res) => {
  try {
    const postsData = readPostsData();
    const newPost = req.body;

    if (!validatePost(newPost)) {
      return res.status(400).json({ message: "Invalid post data" });
    }

    newPost.userId = req.user.id;
    newPost.id = uuidv4();
    newPost.comments = [];
    newPost.image = req.file ? req.file.filename : "";

    postsData.posts.push(newPost);
    writePostsData(postsData);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
});

// تحديث بوست
router.put("/:id", authenticateToken, (req, res) => {
  try {
    const postsData = readPostsData();
    const postIndex = postsData.posts.findIndex(p => p.id === req.params.id);

    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = req.body;
    if (!validatePost(updatedPost)) {
      return res.status(400).json({ message: "Invalid post data" });
    }

    postsData.posts[postIndex] = { ...postsData.posts[postIndex], ...updatedPost };
    writePostsData(postsData);

    res.json(postsData.posts[postIndex]);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
});

// حذف بوست
router.delete("/:id", authenticateToken, (req, res) => {
  try {
    const postsData = readPostsData();
    const postIndex = postsData.posts.findIndex(p => p.id === req.params.id);

    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    postsData.posts.splice(postIndex, 1);
    writePostsData(postsData);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
});

module.exports = router;
