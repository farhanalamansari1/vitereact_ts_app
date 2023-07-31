const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/inotebook"

const connectToMongo=()=>{
   mongoose.connect('mongodb://127.0.0.1:27017/')
  .then(() => console.log('Connected! TO mongo'));
}


module.exports=connectToMongo;