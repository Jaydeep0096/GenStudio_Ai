import sql from "../configs/db.js";

export const getUserCreations = async(req, res)  =>{
    try {
        const { userId } = req.auth(); 
        const creations = await sql `Select * from creations WHERE user_id = ${userId} ORDER BY created_at DESC`

        res.json({success: true, creations});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getPublicCreations = async(req, res)  =>{
    try {
        
        const creations = await sql `Select * from creations WHERE publish = true ORDER BY created_at DESC`

        res.json({success: true, creations});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const toggleLikeCreations = async(req, res)  =>{
    try {

        const {userId} = req.auth();
        const {id} = req.body;

        const [creation] = await sql `select * from creations WHERE id = ${id}`

        if(!creation){
            return res.json({success:false, message: "creations not found"});
        }

        const currentLike = creation.likes;
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        if(currentLike.includes(userIdStr)){
            updatedLikes = currentLike.filter((user) => user != userIdStr);
            message = "creation unlike"
        }else{
            updatedLikes = [...currentLike, userIdStr];
            message = "creation like"
        }
       
        const formattedArray = `{${updatedLikes.join(',')}}`;

        await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`

        res.json({success: true, message});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}