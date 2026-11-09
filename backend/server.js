const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing. Set it in backend/.env before starting the server.");
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully 💜"))
  .catch((err) => console.log("MongoDB Error:", err.message));

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: String,
    email: String,
    address: String,
    eventDate: String,
    eventTime: String,
    notes: String,

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
      },
    ],

    total: Number,

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Order Model
const Order = mongoose.model("Order", orderSchema);

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    eventType: { type: String, default: "Birthday Planning" },
    eventDate: String,
    eventTime: String,
    budget: Number,
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Packages",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

// Get Packages / Products API
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.log("Products load error:", error.message);
    res.status(500).json({
      error: "Products load nahi huay",
    });
  }
});        
// Test API
app.get("/", (req, res) => {
  res.send("Birthday Website Backend Running");
});

// Save Order API
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);

    await order.save();

    res.status(201).json({
      message: "Order saved successfully",
      _id: order._id,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Order save nahi hua",
    });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();

    res.status(201).json({
      message: "Booking request saved successfully",
      _id: message._id,
    });
  } catch (error) {
    console.log("Booking request save error:", error.message);
    res.status(500).json({
      error: "Booking request save nahi hui",
    });
  }
});

// Get Orders API
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      error: "Orders load nahi huay",
    });
  }
});
// Add packages to MongoDB
app.post("/api/seed-products", async (req, res) => {
  try {
    const products = [
      {
        name: "Balloon Wall",
        description: "Beautiful balloon wall decoration for birthday celebrations.",
        price: 18000,
        image: "https://i.pinimg.com/736x/25/05/1d/25051d65f0ee8026e52549b7ae9065bb.jpg",
        category: "Packages",
        featured: true,
        slug: "balloon-wall",
      },
      {
        name: "Inflatable Castle",
        description: "Fun jumping castle for kids' birthday parties.",
        price: 15000,
        image: "https://res.cloudinary.com/skyhighpartyrentals/c_fill,w_1200,h_600/media/catalog/product/i/c/ice-cream-water-slide-birthday-party-wide.jpg",
        category: "Packages",
        featured: true,
        slug: "inflatable-castle",
      },
    ];

    for (const product of products) {
      await Product.findOneAndUpdate(
        { slug: product.slug },
        product,
        { upsert: true, new: true, runValidators: true }
      );
    }

    const savedProducts = await Product.find();

    res.json({
      message: "Packages saved successfully!",
      packages: savedProducts,
    });
  } catch (error) {
    console.log("Package save error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});