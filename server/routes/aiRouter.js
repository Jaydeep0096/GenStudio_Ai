
import express from 'express';
import { auth } from '../middlewares/Auth.js';
import {generateArticle, generateBlogTitle, generateImage, removeBackgroundImage, removeBackgroundObject, resumeReview } from '../controllers/aiController.js'
import {upload} from '../configs/multer.js';

const aiRoute =  express.Router();

aiRoute.post("/write-article", auth, generateArticle)
aiRoute.post("/generate-blog-title", auth, generateBlogTitle)
aiRoute.post("/generate-image", auth, generateImage)
aiRoute.post("/remove-background", auth, upload.single('image'), removeBackgroundImage)
aiRoute.post("/remove-object", auth, upload.single('image'), removeBackgroundObject)
aiRoute.post("/review-resume", auth, upload.single('resume'), resumeReview)


export default aiRoute;