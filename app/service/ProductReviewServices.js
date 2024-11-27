import ReviewsModel from "../model/reviewsModel.js";

export const CreateProductReviewService= async(req)=>{
    try {
        let userID= req.headers.user_id;
        let {productID, des, rating}= req.body;
        let PostJSON= {
            userID: userID,
            productID: productID,
            des: des,
            rating: rating
        };

        let data= await ReviewsModel.updateOne(
            {userID: userID, productID: productID},
            {$set: PostJSON},
            {upsert: true}
        );

        let message= ()=>{
            if(data.upsertedCount=== 1){
                return "Review Created Successfully";
            }else{
                return "Review Updated Successfully";
            }
        }

        return {status: "Success", message: message(), data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
};
