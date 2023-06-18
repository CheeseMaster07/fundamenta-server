import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  likedStocks: { type: [String], default: [] },
  likedStocksSector: { type: [String], default: [] },
  likedStocksIndustry: { type: [String], default: [] },
  preferences: {
    stocks: {
      marketCap: { type: Number, default: 0 }, // done
      beta: { type: Number, default: 0 }, // done
      sector: { type: String, default: '' },
      industry: { type: String, default: '' },
      pe: { type: Number, default: 0 }, // done
      forwardPe: { type: Number, default: 0 }, // done
      pb: { type: Number, default: 0 }, // done
      dividendYield: { type: Number, default: 0 }, // done
      growth: { type: Number, default: 0 }, // done
      grossMargin: { type: Number, default: 0 }, // done
      netMargin: { type: Number, default: 0 }, // done
      roic: { type: Number, default: 0 },
      profitable: { type: Number, default: 0 }, // done
    },
  },
});

const User = mongoose.model('User', userSchema);

export default User;