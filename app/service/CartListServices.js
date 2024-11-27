import CartsModel from '../model/cartsModel.js';

import mongoose from 'mongoose';
const ObjectId=mongoose.Types.ObjectId;



export const CreateCartService= async(req)=>{
    try {
        let userID= req.headers.user_id;
        let {productID, color, qty, size}= req.body;
        let PostJSON= {
            userID: userID,
            productID: productID,
            color: color,
            qty: qty,
            size: size
        };

        await CartsModel.create(PostJSON);

        return {status: "Success", message: "Cart Create Successfully"};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
};



export const RemoveCartService= async(req)=>{
    try {
        let userID= req.headers.user_id;
        let {cart_id}= req.body;
        let PostJSON= {
            userID: userID,
            _id: cart_id
        };
        
        await CartsModel.deleteOne(PostJSON);
        
        return {status: "Success", message: "Removed Successfully"};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const ReadCartListService= async(req)=>{
    try {
        let userID= new ObjectId(req.headers.user_id);
        let MatchStage= {$match: {userID: userID}};

        let JoinWithProductStage= {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};
        // let JoinWithBrandStage= {$lookup: {from: "brands", localField: "productID", foreignField: "_id", as: "product"}};
        // let JoinWithCategoryStage= {$lookup: {from: "categories", localField: "productID", foreignField: "_id", as: "product"}};

        let UnwindProductStage= {$unwind: "$product"};
        // let UnwindBrandStage= {$unwind: "$product"};
        // let UnwindCategoryStage= {$unwind: "$product"};



        let data= await CartsModel.aggregate([
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


export const UpdateCartService= async(req)=>{
    try {
        let userID= req.headers.user_id;
        let {id, color, qty, size}= req.body;
        let PostJSON= {
            _id: id,
            color: color,
            qty: qty,
            size: size
        };

        let data= await CartsModel.updateOne({userID: userID, _id: id},{$set: PostJSON});

        return {status: "Success", message: "Cart Updated Successfully", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
};