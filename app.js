import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import {DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE} from "./app/config/config.js";
import router from "./routes/api.js";

const app= express();

//App use default middleware
app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODE}));
app.use(helmet());

//App use limiter
const limiter= rateLimit({windowMs: REQUEST_TIME, max: REQUEST_NUMBER});
app.use(limiter);

//Cache
app.set('etag', WEB_CACHE);

//Database connection
mongoose.connect(DATABASE, {autoIndex: true}).then(()=>{
    console.log("MongoDB connected");
}).catch(()=>{
    console.log("MongoDB disconnected");
});

app.use("/api/v1", router);

//connect Frontend
app.use(express.static('client/dist'));

//add react frontend routing
app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
});

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}...`);
});