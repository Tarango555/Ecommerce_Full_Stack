import FeaturesModel from '../model/featuresModel.js';

export const FeaturesListService = async (req)=>{
    try{
 
        let data= await FeaturesModel.find();
         return {status:"success",data: data};

     }catch (e) {
         return {status:"fail", message:"Something Went Wrong"}
     }
 }