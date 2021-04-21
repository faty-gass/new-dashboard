import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    phone : {
      type : String
    },
    birthdate : {
      type : Date,
      min : '1900-01-01'
    },
    role : {
      type : String,
      enum : ['user','admin'],
      default : 'user'
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', schema);