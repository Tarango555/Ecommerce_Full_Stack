import UsersModel from '../model/usersModel.js';
import ProfilesModel from '../model/profilesModel.js';
//import SendEmail from '../utility/emailUtility.js';
import {TokenEncode} from '../utility/tokenUtility.js';

export const LoginService= async(req)=>{
    try {
        let code= Math.floor(100000+ Math.random()*900000);
        let {email}= req.body;
        let EmailText= `Your Verification Code is= ${code}`;
        let EmailSubject= "Email Verification";

        //await SendEmail(email, EmailText, EmailSubject);

        await UsersModel.updateOne(
            {email: email},
            {$set: {otp: code}},
            {upsert: true}
        );
        return {status: "Success", "Message": "6 Digit Code Sent Successfully."};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const VerifyEmailService= async(req)=>{
    try {
        let {email, otp}= req.body;
        let total= await UsersModel.find({email: email, otp: otp});
        if(total.length===1){
            let user_id= await UsersModel.find({email: email, otp: otp}).select('_id');
            let token= TokenEncode(email, user_id[0]['_id'].toString());
            await UsersModel.updateOne({email: email}, {$set: {otp: 0}});
            return {status: "Success", "Message": "Valid OTP", token: token};
        }else{
            return {status: "fail", "Message": "Invalid OTP"};
        }
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const CreateUserProfileService= async(req)=>{
    try {
        let user_id= req.headers.user_id;
        let reqBody= req.body;
        reqBody.userID= user_id;

        await ProfilesModel.updateOne(
            {userID: user_id},
            {$set: reqBody},
            {upsert: true}
        );
        
        return {status: "Success", message: "Profile is saved successfully"};
    }
    catch(err){
        return {status: "fail", "Message": "Something Went Wrong"};
    }
}



export const UpdateUserProfileService= async(req)=>{
    try {
        let user_id= req.headers.user_id;
        let reqBody= req.body;
        reqBody.userID= user_id;

        await ProfilesModel.updateOne(
            {userID: user_id},
            {$set: reqBody},
            {upsert: true}
        );
        
        return {status: "Success", message: "Profile is updated successfully"};
    }
    catch(err){
        return {status: "fail", "Message": "Something Went Wrong"};
    }
}



export const ReadUserProfileService= async(req)=>{
    try {
        let user_id= req.headers.user_id;
        let data = await ProfilesModel.findOne({userID: user_id});
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}