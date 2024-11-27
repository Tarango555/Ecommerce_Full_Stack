import {
    ProductListByBrandService,
    ProductListByCategoryService,
    SliderListService,
    ProductListByRemarkService,
    ProductListByKeywordService,
    ProductDetailsByIDService,
    ProductReviewListByIDService
    
} from '../service/ProductServices.js';

export const ProductListByBrand= async(req, res)=>{
    let result= await ProductListByBrandService(req);
    return res.json(result);
};

export const ProductListByCategory= async(req, res)=>{
    let result= await ProductListByCategoryService(req);
    return res.json(result);
};

export const SliderList= async(req, res)=>{
    let result= await SliderListService();
    return res.json(result);
};

export const ProductListByRemark= async(req, res)=>{
    let result= await ProductListByRemarkService(req);
    return res.json(result);
};

export const ProductListByKeyword= async(req, res)=>{
    let result= await ProductListByKeywordService(req);
    return res.json(result);
};

export const ProductDetailsByID= async(req, res)=>{
    let result= await ProductDetailsByIDService(req);
    return res.json(result);
};

export const ProductReviewListByID= async(req, res)=>{
    let result= await ProductReviewListByIDService(req);
    return res.json(result);
};