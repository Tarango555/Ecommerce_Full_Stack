import mongoose from 'mongoose';

const DataSchema= new mongoose.Schema(
    {
        type:{type:String,unique:true,required:true},
        description:{type:String,required:true}
    },
    {
        timestamps: true,
        versionKey:false
    }

)

const LegalsModel= mongoose.model('legals', DataSchema);

export default LegalsModel;