import mongoose,{Schema} from "mongoose";
const subscriptionSchema=new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,//who is subscribing
        ref:"User"
     },
     channel:{
        type:Schema.Types.ObjectId,//who's chanel is subscribed
        ref:"User"
     }
})
export const Subscription = mongoose.model("Subscription",subscriptionSchema)