import mongoose from 'mongoose'
const stockSchema = new mongoose.Schema({
  ticker: String,
  name: String,
  updatedAt: Date,
  FinancialStatements: {
    IncomeStatement: {
      annualReports: [mongoose.Schema.Types.Mixed],
      quarterlyReports: [mongoose.Schema.Types.Mixed]
    },
    BalanceSheet: {
      annualReports: [mongoose.Schema.Types.Mixed],
      quarterlyReports: [mongoose.Schema.Types.Mixed]
    },
    CashflowStatement: {
      annualReports: [mongoose.Schema.Types.Mixed],
      quarterlyReports: [mongoose.Schema.Types.Mixed]
    },
  },
  Ratios: {
    Valuation: {
      annualReports: [mongoose.Schema.Types.Mixed],
      quarterlyReports: [mongoose.Schema.Types.Mixed]
    },
    Profitability: {
      annualReports: [mongoose.Schema.Types.Mixed],
      quarterlyReports: [mongoose.Schema.Types.Mixed]
    },
    FinancialStability: {
      annualReports: [mongoose.Schema.Types.Mixed],
      quarterlyReports: [mongoose.Schema.Types.Mixed]
    }
  }

});

const Stock = mongoose.model('stock', stockSchema);

export default Stock;