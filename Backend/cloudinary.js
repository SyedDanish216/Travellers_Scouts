require('dotenv').config();
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'du1fhh2jf',
    api_key: '813485757241531',
    api_secret: '7GQNO_D3PdRtEppDXx0TdU9YxLU',
});


exports.uploads=(file,folder)=>{
    return new Promise(resolve=>{
        cloudinary.uploader.upload(file,(result)=>{
           resolve({
               url:result.url,
               id:result.public_id
           })
        },{
            resource_type:"auto",
            folder:folder
        })
    })
}

//module.exports = { cloudinary };
