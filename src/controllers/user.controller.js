import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser=asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"fisrt run successfull"
    })
})
export {registerUser}