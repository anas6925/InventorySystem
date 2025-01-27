import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import vendorRoutes from "./routes/vendor.js";
import groupRoutes from "./routes/group.js";
import itemsRoutes from "./routes/item.js";
import studentRoutes from "./routes/student.js";
import rawItemsRoutes from "./routes/RawItem.js";
import authRoutes  from './routes/authRoutes.js';
import addCourseRoutes from './routes/addCourse.js'
import addChapters from './routes/addChapter.js'
import addCategory from "./routes/addCategory.js";
import addResource from "./routes/addResource.js";


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/api/auth', authRoutes); 
app.use("/api/client", clientRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/rawitems", rawItemsRoutes); 
app.use("/api/addCourse", addCourseRoutes);
app.use("/api/addChapter", addChapters);
app.use("/api/addCategory", addCategory);
app.use("/api/addResource", addResource);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
