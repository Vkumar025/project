import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //take hints from user model
  //get user details
  // validations (at least not empty)
  // check if already exit:username and email
  //avatar,coverimage
  //upload them to cloudinary (cloudinary returns URL)
  //create user object-creattion call(create entry in db)
  //remove password and refresh token field from response
  //check if response is returned not null response is created
  //if created return user or return error
  //return res

  const { username, fullName, password, email } = req.body;
  console.log("email:", email);

  // if(fullName===""){
  //     throw new ApiError(400,"fullname is required")
  // }
  if (
    [username, fullName, password, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username is already exist");
  }
  // req.files  is provided by multer
  console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(409, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const user= await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken" //to remove these fields from returning
   )
   if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
   }
   return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully"))
});
export { registerUser };
