const express = require('express');
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require("./models/user");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // إضافة توقيت فريد للملف
  }
});

const upload = multer({ storage: storage });
app.use(express.urlencoded({ extended: true }));
const dataPath = path.join(__dirname, "data", "data.json");
if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"), { recursive: true });
}

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (error) {
    console.error("Error reading data:", error);
    throw new Error("Error reading data");
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing data:", error);
    throw new Error("Error writing data");
  }
};

const readPostsData = () => {
  try {
    const data = readData();
    return { posts: data.posts };
  } catch (error) {
    console.error("Error reading posts data:", error);
    throw new Error("Error reading posts data");
  }
};

const writePostsData = (data) => {
  try {
    const currentData = readData();
    currentData.posts = data.posts;
    writeData(currentData);
  } catch (error) {
    console.error("Error writing posts data:", error);
    throw new Error("Error writing posts data");
  }
};

const validatePost = (post) => {
  return (
    post.title &&
    typeof post.title === "string" &&
    post.description &&
    typeof post.description === "string"
  );
};
const validateComment = (comment) => {
  return comment.text && typeof comment.text === "string";
};
app.get("/users", (req, res) => {
  try {
    const data = readData();
    res.json(data.users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

app.post('/users/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get("/posts", (req, res) => {
  try {
    const data = readPostsData();
    res.json(data.posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
});

app.post("/posts", upload.single("image"), (req, res) => {
  try {
    // قراءة بيانات المنشورات والمستخدمين من الملفات
    const postsData = readPostsData();
    const usersData = readData();

    // الحصول على بيانات المنشور من الجسم
    const newPost = req.body;

    if (!validatePost(newPost)) {
      return res.status(400).json({ message: "Invalid post data" });
    }

    
    newPost.userId = req.user ? req.user.id : null;
    newPost.id = uuidv4(); 
    newPost.comments = newPost.comments || []; // تعيين قيمة افتراضية للتعليقات إذا لم تكن موجودة
    newPost.image = req.file ? req.file.filename : ""; // تعيين اسم الصورة إذا تم تحميلها

    postsData.posts.push(newPost);
    writePostsData(postsData);

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
});


app.put("/posts/:id", (req, res) => {
  try {
    const data = readData();
    const postIndex = data.posts.findIndex((p) => p.id === req.params.id);

    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = req.body;
    if (!validatePost(updatedPost)) {
      return res.status(400).json({ message: "Invalid post data" });
    }

    if (
      updatedPost.userId &&
      data.posts[postIndex].userId !== updatedPost.userId
    ) {
      return res.status(403).json({ message: "User ID mismatch" });
    }

    data.posts[postIndex] = { ...data.posts[postIndex], ...updatedPost };
    writeData(data);

    res.json(data.posts[postIndex]);
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
});

app.delete("/posts/:id", (req, res) => {
  try {
    const data = readData();
    const postIndex = data.posts.findIndex((p) => p.id === req.params.id);

    if (postIndex !== -1) {
      const postUserId = data.posts[postIndex].userId;

      const user = data.users.find((user) =>
        user.id === req.user ? req.user.id : null
      );
      if (!user || postUserId !== user.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this post" });
      }

      data.posts.splice(postIndex, 1);
      writeData(data);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
});

app.post("/posts/:id/comments", (req, res) => {
  try {
    const postsData = readPostsData();
    const postIndex = postsData.posts.findIndex((p) => p.id === req.params.id);

    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = req.body;

    if (!validateComment(newComment)) {
      return res.status(400).json({ message: "Invalid comment data" });
    }

    newComment.id = uuidv4();
    postsData.posts[postIndex].comments.push(newComment);
    writePostsData(postsData);

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
});
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 