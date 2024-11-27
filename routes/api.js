import express from "express";
const router = express.Router();

import * as UsersController from "../app/controllers/UsersController.js";
import * as BrandController from "../app/controllers/BrandController.js";
import * as CategoryController from "../app/controllers/CategoryController.js";
import * as ProductController from "../app/controllers/ProductController.js";
import * as WishListController from "../app/controllers/WishListController.js";
import * as CartListController from "../app/controllers/CartListController.js";
import * as InvoiceController from "../app/controllers/InvoiceController.js";
import * as FeaturesController from "../app/controllers/FeatureController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";


//User
router.post("/Login", UsersController.Login);
router.post('/VerifyEmail', UsersController.VerifyEmail);
router.post('/CreateUserProfile', AuthMiddleware, UsersController.CreateUserProfile);
router.post('/UpdateUserProfile', AuthMiddleware, UsersController.UpdateUserProfile);
router.get('/ReadUserProfile', AuthMiddleware, UsersController.ReadUserProfile);

//Brand
router.get("/BrandList", BrandController.BrandList);

//Category
router.get('/CategoryList', CategoryController.CategoryList);

//Product
router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory);
router.get('/SliderList', ProductController.SliderList);
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark);
router.get('/ProductListByKeyword/:keyword', ProductController.ProductListByKeyword);
router.get('/ProductDetailsByID/:ProductID', ProductController.ProductDetailsByID);
router.get('/ProductReviewListByID/:ProductID', ProductController.ProductReviewListByID);

//WishList
router.post('/CreateWish', AuthMiddleware, WishListController.CreateWish);
router.post('/RemoveWish', AuthMiddleware, WishListController.RemoveWish);
router.get('/ReadWishList', AuthMiddleware, WishListController.ReadWishList);

//CartList
router.post('/CreateCart', AuthMiddleware, CartListController.CreateCart);
router.post('/RemoveCart', AuthMiddleware, CartListController.RemoveCart);
router.get('/ReadCartList', AuthMiddleware, CartListController.ReadCartList);
router.post('/UpdateCart', AuthMiddleware, CartListController.UpdateCart);

//Reviews
router.post('/CreateProductReview', AuthMiddleware, UsersController.CreateProductReview);
router.post('/UpdateProductReview', AuthMiddleware, UsersController.UpdateProductReview);

//Invoice
router.post("/CreateInvoice", AuthMiddleware, InvoiceController.CreateInvoice);

router.post('/PaymentSuccess/:trxID', InvoiceController.PaymentSuccess);
router.post('/PaymentFail/:trxID', InvoiceController.PaymentFail);
router.post('/PaymentCancel/:trxID', InvoiceController.PaymentCancel);
router.post('/PaymentIPN/:trxID', InvoiceController.PaymentIPN);

router.get('/InvoiceList', AuthMiddleware, InvoiceController.InvoiceList);
router.get('/InvoiceProductList/:invoice_id', AuthMiddleware, InvoiceController.InvoiceProductList);

//Features
router.get('/FeaturesList', FeaturesController.FeaturesList);



export default router;