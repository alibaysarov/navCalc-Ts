import { Schema,model,InferSchemaType } from 'mongoose';
const AirportSchema=new Schema({
  
    location:{
      type:{
        type:String,
        default:"Feature",
        required:true
      },
      properties:{
        name:{
          type:String,
          required:true
        },
        code:{
          type:String,
          required:true
        },
      },
      geometry:{
        type:{
          type:String,
          default:"Point",
          required:true
        },
        coordinates:{
          type:[Number],
          index:"2dsphere",
          required:true
        }
      }
    }
  
  
})

type User = InferSchemaType<typeof AirportSchema>;
export default model('Airport',AirportSchema);