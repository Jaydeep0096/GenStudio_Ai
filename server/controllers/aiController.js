import 'dotenv/config'
import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import { InferenceClient } from "@huggingface/inference";
import { cloudinary } from "../configs/cloudinary.js";
import fs from 'fs';
import { createRequire } from "module";
// import pdf from 'pdf-parse' ///lib/pdf-parse.js

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async(req, res) =>{
    try {
        const {userId} = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >=10){
            return res.json({success : false, message: "Limit reached. Upgrade to continue"});
        }

        const response = await AI.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
             temperature: 0.7,
             max_tokens: length,
        });

        const content = response.choices[0].message.content;

        await sql `INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, ${prompt}, ${content}, 'article')` 

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                free_usage: free_usage + 1
                }
            })
            }

        res.json({success: "true", content});


    } catch (error) {
        console.log(error.message);
        res.json({success:"false", message:error.message})
    }
}

export const generateBlogTitle = async(req, res) =>{
    try {
        const{userId} = req.auth();
        const { prompt } = req.body;
        const plan = req.plan
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >=10){
            return res.json({success : false, message: "Limit reached. Upgrade to continue"});
        }

        const response = await AI.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
             temperature: 0.7,
             max_tokens: 500,
        });

        const content = response.choices[0].message.content;

        await sql `INSERT INTO creations (user_id, prompt, content, type) VALUES(${userId}, ${prompt}, ${content}, 'blog-title')` 

        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                free_usage: free_usage + 1
                }
            })
            }

        res.json({success: true, content});


    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth(); // fix: property, not function
    const prompt = req.body.prompt?.trim();
    const { publish } = req.body;
    const plan = req.plan

    if(plan !== 'premium'){
        return res.json({success : false, message: "This future is for only premium member"});
    }

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    if (prompt.length > 1000) {
      return res.status(400).json({ success: false, message: "Prompt too long (max 1000 chars)" });
    }

    

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const base64Image = response.data?.result?.image;

    if (!base64Image) {
      return res.status(500).json({ success: false, message: "Image generation failed" });
    }

    const content = `data:image/png;base64,${base64Image}`;

    const { secure_url } = await cloudinary.uploader.upload(content, {
      folder: "ai-images",
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message,
    });
  }
};

export const removeBackgroundImage = async (req, res) => {
  try {
    const { userId } = req.auth(); // fix: property, not function
    const image = req.file;
    const plan = req.plan;

    // console.log("REQ FILE:", req.file);
    // console.log("PLAN:", req.plan);

    if(plan !== 'premium'){
            return res.json({success : false, message: "This future is for only premium member"});
        }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
        transformation :[
            {
                effect : 'background_removal',
                // background_remove : 'remove_the_background'
            }
        ]
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'remove background from image', ${secure_url}, 'image')
    `;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message,
    });
  }
};

export const removeBackgroundObject = async (req, res) => {
  try {
    const { userId } = req.auth(); // fix: property, not function
    const {object} = req.body;
    const image = req.file;
    const plan = req.plan;


     if(plan !== 'premium'){
            return res.json({success : false, message: "This future is for only premium member"});
        }

    const { public_id } = await cloudinary.uploader.upload(image.path);
    // console.log("OBJECT:", object);
    // console.log("PUBLIC ID:", public_id);
    // const { secure_url } = await cloudinary.uploader.upload(image.path);


    const image_url = cloudinary.url(public_id, 
      {
        transformation :[ {effect : `gen_remove:${object}` }],
        resource_type: 'image'
    }
  );
    
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`removed ${object} from image`}, ${image_url}, 'image')`;

    res.json({ success: true, content: image_url });

  } catch (error) {
    // console.error(error.response?.data || error.message);
    // res.status(500).json({
    //   success: false,
    //   message: error.response?.data?.errors?.[0]?.message || error.message,
    // });

    console.log("REMOVE OBJECT FULL ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
  }
};

// export const resumeReview = async (req, res) => {
//   try {
//     const { userId } = req.auth(); // fix: property, not function
//     const resume = req.file;
//     const plan = req.plan;

//     if(plan !== 'premium'){
//             return res.json({success : false, message: "This future is for only premium member"});
//         }

//     if(resume.size > 5 * 1024 * 1024){
//         return res.json({success: false, message:" resume file size exceed allowed size 5 MB"});
//     }

//     const require = createRequire(import.meta.url);
//     const pdf = require("pdf-parse");

//     // const dataBuffer = fs.readFileSync(resume.path);

//     const dataBuffer = new Uint8Array(resume.buffer);
//     const pdf_data = await pdf(dataBuffer);
//     // const dataBuffer =resume.buffer;
//     // const pdf_data = await pdf(dataBuffer);

//     const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume content:\n\n${pdf_data.text}`;

//      const response = await AI.chat.completions.create({
//             model: "gemini-3-flash-preview",
//             messages: [
//                 {
//                     role: "user",
//                     content: prompt,
//                 },
//             ],
//              temperature: 0.7,
//              max_tokens: 1000,
//         });

//         const content = response.choices[0].message.content;
    
//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, 'review the uploaded resume' , ${content}, 'resume-review')`;

//     res.json({ success: true, content });

//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({
//       success: false,
//       message: error.response?.data?.errors?.[0]?.message || error.message,
//     });
//   }
// };

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    if (plan !== 'premium') {
      return res.json({
        success: false,
        message: "This feature is for only premium member"
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceed allowed size 5 MB"
      });
    }

    const require = createRequire(import.meta.url);
    const pdf = require("pdf-parse");

    let dataBuffer;

    if (resume.buffer) {
      dataBuffer = resume.buffer;
    } else if (resume.path) {
      dataBuffer = fs.readFileSync(resume.path);
    } else {
      return res.status(400).json({
        success: false,
        message: "Resume file data not found",
      });
    }

    const pdf_data = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement.and only 2000 words Resume content:\n\n${pdf_data.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'review the uploaded resume', ${content}, 'resume-review')
    `;

    res.json({ success: true, content });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: error.response?.data?.errors?.[0]?.message || error.message,
    });
  }
};