import WishesModel from '../model/wishesModel.js';

import mongoose from 'mongoose';
const ObjectId=mongoose.Types.ObjectId;



export const CreateWishService= async(req)=>{
    try {
        let userID= req.headers.user_id;
        let {productID}= req.body;
        let PostJSON= {
            userID: userID,
            productID: productID
        };

        await WishesModel.updateOne(
            PostJSON,
            {$set: PostJSON},
            {upsert: true}
        );

        return {status: "Success", message: "Create Successfully"};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
};



export const ReadWishListService= async(req)=>{
    try {
        let userID= new ObjectId(req.headers.user_id);
        let MatchStage= {$match: {userID: userID}};

        let JoinWithProductStage= {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};
        // let JoinWithProductStage= {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};
        // let JoinWithProductStage= {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};

        let UnwindProductStage= {$unwind: "$product"};



        let data= await WishesModel.aggregate([
            MatchStage,
            JoinWithProductStage,
            UnwindProductStage
        ]);
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const RemoveWishService= async(req)=>{
    try {
        let userID= req.headers.user_id;
        let {productID}= req.body;
        let PostJSON= {
            userID: userID,
            productID: productID
        };

        await WishesModel.deleteOne(PostJSON);

        return {status: "Success", message: "Removed Successfully"};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}