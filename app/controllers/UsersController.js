import {
    LoginService,
    VerifyEmailService,
    CreateUserProfileService,
    UpdateUserProfileService,
    ReadUserProfileService
} from '../service/UsersServices.js';
import {CreateProductReviewService} from '../service/ProductReviewServices.js';



export const Login= async(req, res)=>{
    let result= await LoginService(req);
    return res.json(result);
};



export const VerifyEmail= async(req, res)=>{
    let result= await VerifyEmailService(req);
    return res.json(result);
};



export const CreateUserProfile= async(req, res)=>{
    let result= await CreateUserProfileService(req);
    return res.json(result);
};



export const UpdateUserProfile= async(req, res)=>{
    let result= await UpdateUserProfileService(req);
    return res.json(result);
};



export const ReadUserProfile= async(req, res)=>{
    let result= await ReadUserProfileService(req);
    return res.json(result);
};



export const CreateProductReview= async(req, res)=>{
    let result= await CreateProductReviewService(req);
    return res.json(result);
};



export const UpdateProductReview= async(req, res)=>{
    let result= await CreateProductReviewService(req);
    return res.json(result);
};