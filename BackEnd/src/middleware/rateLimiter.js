import ratelimit from "../config/upstash.js";



const rateLimiter  = async (req , res , next) =>{

    try {
        const {success} = await  ratelimit.limit("my-limit-key");
         
        if(!success){
            return res.status(429).json({
                message : "Too many request , Please try again Later"
            })
        }

        next()
    } catch (error) {
        console.log("Rate Limit Error ", error);
        next(error);
    }

}




export default rateLimiter;