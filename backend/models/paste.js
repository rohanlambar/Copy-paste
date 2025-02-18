// files contains data model of paste stored in database
import mongoose from 'mongoose'

const pasteSchema = mongoose.Schema({
      title : {
        type : String ,
        require : true,
      },
      content : {
        type : String ,
        require : true,
      },
      createdBy : {
             type : mongoose.Schema.Types.ObjectId,
             ref  : 'User',
             required : true,
      },
      creationTime : {
            type : String,
            required : true,
            default: () => new Date().toISOString(),
      }
},
{
    timestamps : true,
})


const Paste = mongoose.model("Paste",pasteSchema);

export default Paste;