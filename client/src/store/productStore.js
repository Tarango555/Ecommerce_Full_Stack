import { create } from "zustand";
import axios from "axios";

const productStore = create((set)=>({
    BrandList: null,
    BrandListRequest: async()=>{
        let res = await axios.get('/api/v1/BrandList');
        if(res.data['status']==="success"){
            set({BrandList: res.data['data']});
        }
    },

    CategoryList: null,
    CategoryListRequest: async()=>{
        let res = await axios.get('/api/v1/CategoryList');
        if(res.data['status']==="success"){
            set({CategoryList: res.data['data']});
        }
    },

    SliderList: null,
    SliderListRequest: async()=>{
        let res = await axios.get('/api/v1/SliderList');
        if(res.data['status']==="success"){
            set({SliderList: res.data['data']});
        }
    },

    ProductListByRemark: null,
    ProductListByRemarkRequest: async(Remark)=>{
        let res = await axios.get('/api/v1/ProductListByRemark/${Remark');
        if(res.data['status']==="success"){
            set({ProductListByRemark: res.data['data']});
        }
    },
}))

export default productStore;