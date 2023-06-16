import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  likedStocks: { type: [String], default: [] },
  preferences: {
    stocks: {
      marketCap: { type: Number, default: 0 },
      beta: { type: Number, default: 0 },
      sector: { type: String, default: '' },
      industry: { type: String, default: '' },
      pe: { type: Number, default: 0 },
      growth: { type: Number, default: 0 },
      margins: { type: Number, default: 0 },
      roic: { type: Number, default: 0 },
      profitable: { type: Number, default: 0 },
    },
  },
});

const User = mongoose.model('User', userSchema);

export default User;