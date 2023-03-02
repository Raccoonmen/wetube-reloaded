import mongoose from "mongoose";

//여기는 Mongo DB에  데이터 저장시 기본 형식이 저장되는 Schema(스키마)가 있습니다. 

const videoSchema = new mongoose.Schema({
    title: {type:String, required: true, trim: true, maxLegth:80 },
    description: {type:String, required: true, trim: true, minLegth:20},
    createdAt: {type:Date, required: true, default: Date.now },
    hashtags: [{type: String}],
    meta: {
        views: {type: Number, default:0, required: true },
        rating: {type: Number, default:0, required: true },
    },    
});

videoSchema.static("formatHashtags", function (hashtags){
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});


const movieModel = mongoose.model("Video", videoSchema);

export default movieModel;

