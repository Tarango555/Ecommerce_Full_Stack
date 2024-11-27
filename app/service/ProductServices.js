import BrandsModel from '../model/brandsModel.js';
import CategoriesModel from '../model/categoriesModel.js';
import ProductsModel from '../model/productsModel.js';
import ProductSlidersModel from '../model/productslidersModel.js';
import ReviewsModel from '../model/reviewsModel.js';


//Define ObjectId
import mongoose from 'mongoose';
const ObjectId=mongoose.Types.ObjectId;



export const BrandListService= async()=>{
    try {
        let data = await BrandsModel.find();
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const CategoryListService= async()=>{
    try {
        let data = await CategoriesModel.find();
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const ProductListByBrandService= async(req)=>{
    try {
    
        let BrandID= new ObjectId(req.params.BrandID);
        let MatchStage= {$match: {brandID: BrandID}};

        let JoinWithBrandStage= {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}}
        let JoinWithCategoryStage= {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}}

        let UnwindBrandStage= {$unwind: "$brand"};
        let UnwindCategoryStage= {$unwind: "$category"};

        let ProjectionStage= {$project: {

            "_id": 0,
            "categoryID": 0,
            "brandID": 0,
            "brand._id": 0,
            "category._id": 0
        }};
        
        let data = await ProductsModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const ProductListByCategoryService= async(req)=>{
    try {
    
        let CategoryID= new ObjectId(req.params.CategoryID);
        let MatchStage= {$match: {categoryID: CategoryID}};

        let JoinWithBrandStage= {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}}
        let JoinWithCategoryStage= {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}}

        let UnwindBrandStage= {$unwind: "$brand"};
        let UnwindCategoryStage= {$unwind: "$category"};

        let ProjectionStage= {$project: {

            // "_id": 0,
            // "categoryID": 0,
            // "brandID": 0,
            // "brand._id": 0,
            // "category._id": 0
            "category.categoryName": 1
        }};
        
        let data = await ProductsModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const SliderListService= async()=>{
    try {
        let data = await ProductSlidersModel.find();
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const ProductListByRemarkService= async(req)=>{
    try {
        let Remark= req.params.Remark;
        let MatchStage= {$match: {remark: Remark}};

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}

        let ProjectionStage={$project:{
            'remark': 1
            // 'brand._id':0,
            // 'category._id':0,
            // 'categoryID':0,
            // 'brandID':0
        }};

        let data = await ProductsModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const ProductListByKeywordService= async(req)=>{
    try {
        let keyword= req.params.keyword;
        let regex= {"$regex": keyword, "$options": "i"};
        let SearchParams= [{title: regex},{shortDes: regex}];
        let SearchQuery= {$or: SearchParams};
        let MatchStage= {$match: SearchQuery};

        let JoinWithBrandStage= {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}}
        let JoinWithCategoryStage= {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}}

        let UnwindBrandStage= {$unwind: "$brand"};
        let UnwindCategoryStage= {$unwind: "$category"};

        let ProjectionStage= {$project: {

            "_id": 0,
            "categoryID": 0,
            "brandID": 0,
            "brand._id": 0,
            "category._id": 0
        }};

        let data = await ProductsModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);
    
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}




export const ProductDetailsByIDService= async(req)=>{
    try {
        let ProductID= new ObjectId(req.params.ProductID);
        let MatchStage= {$match: {_id: ProductID}}

        let JoinWithBrandStage= {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let JoinWithCategoryStage={$lookup: {from:"categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinWithProductDetailsStage= {$lookup: {from:"productdetails", localField: "_id", foreignField: "productID", as: "details"}};

        let UnwindBrand= {$unwind: "$brand"};
        let UnwindCategory= {$unwind: "$category"};
        let UnwindDetails= {$unwind: "$details"};

        let ProjectionStage= {$project: {
            "categoryID": 0,
            "brandID": 0,
            "brand._id": 0,
            "category._id": 0
        }};

        let data = await ProductsModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithProductDetailsStage,
            UnwindBrand,
            UnwindCategory,
            UnwindDetails,
            ProjectionStage

        ]);
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}



export const ProductReviewListByIDService= async(req)=>{
    try {
        let ProductID= new ObjectId(req.params.ProductID);
        let MatchStage= {$match: {productID: ProductID}};
        let JoinWithProfileStage= {$lookup: {from: "profiles", localField: "userID", foreignField: "userID", as: "profile"}};
        let UnwindProfileStage= {$unwind: "$profile"};
        // let ProjectionStage= {$project: {

        // }};
        
        let data = await ReviewsModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage
        ]);
        
        return {status: "Success", data: data};
    }
    catch(err){
        return {status: "fail", "Message": err.toString()};
    }
}