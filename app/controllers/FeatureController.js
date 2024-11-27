import {FeaturesListService} from '../service/FeaturesServices.js';

export const FeaturesList= async(req, res)=>{
    let result= await FeaturesListService(req);
    return res.json(result);
}