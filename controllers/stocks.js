import fs from 'fs'
import csv from 'csv-parser'

import mongoose from 'mongoose'
import Stock from '../models/stock.js'
import User from '../models/user.js'

export const getStocks = async (req, res) => {
  // const stocks = await Stock.find()
  // stocks.forEach(stock => {
  //   console.log(stock.ticker)
  // })
  try {
    // fetch("https://www.sec.gov/include/ticker.txt")
    //   .then(response => response.text())
    //   .then(text => {
    //     const tickers = text.split(/\r?\n/).map(line => {
    //       const [symbol, CIK] = line.split("\t");
    //       return { symbol, CIK };
    //     });

    //     res.status(200).json(tickers)
    //   })

    // const tickers = ['MMM', 'AOS', 'ABT', 'ABBV', 'ABMD', 'ACN', 'ATVI', 'ADM', 'ADBE', 'ADP', 'AAP', 'AES', 'AFL', 'A', 'AIG', 'APD', 'AKAM', 'ALK', 'ALB', 'ARE', 'ALGN', 'ALLE', 'LNT', 'ALL', 'GOOGL', 'GOOG', 'MO', 'AMZN', 'AMCR', 'AMD', 'AEE', 'AAL', 'AEP', 'AXP', 'AMT', 'AWK', 'AMP', 'ABC', 'AME', 'AMGN', 'APH', 'ADI', 'ANSS', 'ANTM', 'AON', 'APA', 'AAPL', 'AMAT', 'APTV', 'ANET', 'AIZ', 'T', 'ATO', 'ADSK', 'AZO', 'AVB', 'AVY', 'BKR', 'BALL', 'BAC', 'BBWI', 'BAX', 'BDX', 'WRB', 'BRK.B', 'BBY', 'BIO', 'TECH', 'BIIB', 'BLK', 'BK', 'BA', 'BKNG', 'BWA', 'BXP', 'BSX', 'BMY', 'AVGO', 'BR', 'BRO', 'BF.B', 'CHRW', 'CDNS', 'CZR', 'CPT', 'CPB', 'COF', 'CAH', 'KMX', 'CCL', 'CARR', 'CTLT', 'CAT', 'CBOE', 'CBRE', 'CDW', 'CE', 'CNC', 'CNP', 'CDAY', 'CERN', 'CF', 'CRL', 'SCHW', 'CHTR', 'CVX', 'CMG', 'CB', 'CHD', 'CI', 'CINF', 'CTAS', 'CSCO', 'C', 'CFG', 'CTXS', 'CLX', 'CME', 'CMS', 'KO', 'CTSH', 'CL', 'CMCSA', 'CMA', 'CAG', 'COP', 'ED', 'STZ', 'CEG', 'COO', 'CPRT', 'GLW', 'CTVA', 'COST', 'CTRA', 'CCI', 'CSX', 'CMI', 'CVS', 'DHI', 'DHR', 'DRI', 'DVA', 'DE', 'DAL', 'XRAY', 'DVN', 'DXCM', 'FANG', 'DLR', 'DFS', 'DISH', 'DIS', 'DG', 'DLTR', 'D', 'DPZ', 'DOV', 'DOW', 'DTE', 'DUK', 'DRE', 'DD', 'DXC', 'EMN', 'ETN', 'EBAY', 'ECL', 'EIX', 'EW', 'EA', 'EMR', 'ENPH', 'ETR', 'EOG', 'EPAM', 'EFX', 'EQIX', 'EQR', 'ESS', 'EL', 'ETSY', 'RE', 'EVRG', 'ES', 'EXC', 'EXPE', 'EXPD', 'EXR', 'XOM', 'FFIV', 'FDS', 'FAST', 'FRT', 'FDX', 'FITB', 'FRC', 'FE', 'FIS', 'FISV', 'FLT', 'FMC', 'F', 'FTNT', 'FTV', 'FBHS', 'FOXA', 'FOX', 'BEN', 'FCX', 'AJG', 'GRMN', 'IT', 'GE', 'GNRC', 'GD', 'GIS', 'GPC', 'GILD', 'GL', 'GPN', 'GM', 'GS', 'GWW', 'HAL', 'HIG', 'HAS', 'HCA', 'PEAK', 'HSIC', 'HSY', 'HES', 'HPE', 'HLT', 'HOLX', 'HD', 'HON', 'HRL', 'HST', 'HWM', 'HPQ', 'HUM', 'HII', 'HBAN', 'IEX', 'IDXX', 'ITW', 'ILMN', 'INCY', 'IR', 'INTC', 'ICE', 'IBM', 'IP', 'IPG', 'IFF', 'INTU', 'ISRG', 'IVZ', 'IPGP', 'IQV', 'IRM', 'JBHT', 'JKHY', 'J', 'JNJ', 'JCI', 'JPM', 'JNPR', 'K', 'KEY', 'KEYS', 'KMB', 'KIM', 'KMI', 'KLAC', 'KHC', 'KR', 'LHX', 'LH', 'LRCX', 'LW', 'LVS', 'LDOS', 'LEN', 'LLY', 'LNC', 'LIN', 'LYV', 'LKQ', 'LMT', 'L', 'LOW', 'LUMN', 'LYB', 'MTB', 'MRO', 'MPC', 'MKTX', 'MAR', 'MMC', 'MLM', 'MAS', 'MA', 'MTCH', 'MKC', 'MCD', 'MCK', 'MDT', 'MRK', 'FB', 'MET', 'MTD', 'MGM', 'MCHP', 'MU', 'MSFT', 'MAA', 'MRNA', 'MHK', 'MOH', 'TAP', 'MDLZ', 'MPWR', 'MNST', 'MCO', 'MS', 'MOS', 'MSI', 'MSCI', 'NDAQ', 'NTAP', 'NFLX', 'NWL', 'NEM', 'NWSA', 'NWS', 'NEE', 'NLSN', 'NKE', 'NI', 'NDSN', 'NSC', 'NTRS', 'NOC', 'NLOK', 'NCLH', 'NRG', 'NUE', 'NVDA', 'NVR', 'NXPI', 'ORLY', 'OXY', 'ODFL', 'OMC', 'OKE', 'ORCL', 'OGN', 'OTIS', 'PCAR', 'PKG', 'PARA', 'PH', 'PAYX', 'PAYC', 'PYPL', 'PENN', 'PNR', 'PEP', 'PKI', 'PFE', 'PM', 'PSX', 'PNW', 'PXD', 'PNC', 'POOL', 'PPG', 'PPL', 'PFG', 'PG', 'PGR', 'PLD', 'PRU', 'PEG', 'PTC', 'PSA', 'PHM', 'PVH', 'QRVO', 'PWR', 'QCOM', 'DGX', 'RL', 'RJF', 'RTX', 'O', 'REG', 'REGN', 'RF', 'RSG', 'RMD', 'RHI', 'ROK', 'ROL', 'ROP', 'ROST', 'RCL', 'SPGI', 'CRM', 'SBAC', 'SLB', 'STX', 'SEE', 'SRE', 'NOW', 'SHW', 'SBNY', 'SPG', 'SWKS', 'SJM', 'SNA', 'SEDG', 'SO', 'LUV', 'SWK', 'SBUX', 'STT', 'STE', 'SYK', 'SIVB', 'SYF', 'SNPS', 'SYY', 'TMUS', 'TROW', 'TTWO', 'TPR', 'TGT', 'TEL', 'TDY', 'TFX', 'TER', 'TSLA', 'TXN', 'TXT', 'TMO', 'TJX', 'TSCO', 'TT', 'TDG', 'TRV', 'TRMB', 'TFC', 'TWTR', 'TYL', 'TSN', 'USB', 'UDR', 'ULTA', 'UAA', 'UA', 'UNP', 'UAL', 'UNH', 'UPS', 'URI', 'UHS', 'VLO', 'VTR', 'VRSN', 'VRSK', 'VZ', 'VRTX', 'VFC', 'VTRS', 'V', 'VNO', 'VMC', 'WAB', 'WMT', 'WBA', 'WBD', 'WM', 'WAT', 'WEC', 'WFC', 'WELL', 'WST', 'WDC', 'WRK', 'WY', 'WHR', 'WMB', 'WTW', 'WYNN', 'XEL', 'XYL', 'YUM', 'ZBRA', 'ZBH', 'ZION', 'ZTS']
    // const tickers = ['MSFT', 'GOOG', 'AMZN']
    //const tickers = ['ADBE']


    const tickers = [];

    fs.createReadStream('C:/Coding/Fundamenta/fundamenta-server/tickers.csv')
      .pipe(csv())
      .on('data', (row) => {
        if (parseFloat(row['Market Cap']) >= 10000000000) {
          tickers.push(row['Symbol']);
        }
      })
      .on('end', () => {
        res.status(200).json(tickers)
      });



  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getStock = async (req, res) => {
  console.time('Time');


  try {
    const ticker = req.params.id.toUpperCase()
    const stock = await Stock.find({ ticker: ticker })
    const currentTime = new Date().getTime()
    const lastUpdatedTime = stock[0]?.updatedAt
    const sixHoursInMilliseconds = 6 * 60 * 60 * 1000
    if (!stock.length) {
      console.time('fetching')
      const stockData = await fetchStockData(ticker.toUpperCase())
      console.timeEnd('fetching')

      const newStockData = new Stock({
        ticker: stockData.ticker,
        name: stockData.name,
        description: stockData.description,
        exchange: stockData.exchange,
        currency: stockData.currency,
        sector: stockData.sector,
        industry: stockData.industry,
        beta: stockData.beta,
        pe: stockData.pe,
        forwardPe: stockData.forwardPe,
        pb: stockData.pb,
        dividendYield: stockData.dividendYield,
        pre5yrsCAGR: stockData.pre5yrsCAGR,
        latestSharesOutstanding: stockData.latestSharesOutstanding,
        updatedAt: new Date().getTime(),
        Pricing: stockData.Pricing,
        FinancialStatements: stockData.FinancialStatements,
        Ratios: stockData.Ratios
      })
      try {
        await newStockData.save()
      } catch { }
      res.status(200).json(stockData)
    } else if (currentTime - lastUpdatedTime > (sixHoursInMilliseconds * 4)) {
      try {
        const stockData = await fetchStockData(ticker.toUpperCase())
        stock[0].ticker = ticker
        stock[0].name = stockData.name
        stock[0].description = stockData.description
        stock[0].exchange = stockData.exchange
        stock[0].currency = stockData.currency
        stock[0].sector = stockData.sector
        stock[0].industry = stockData.industry
        stock[0].beta = stockData.beta
        stock[0].pe = stockData.pe
        stock[0].forwardPe = stockData.forwardPe
        stock[0].pb = stockData.pb
        stock[0].dividendYield = stockData.dividendYield
        stock[0].pre5yrsCAGR = stockData.pre5yrsCAGR
        stock[0].latestSharesOutstanding = stockData.latestSharesOutstanding
        stock[0].updatedAt = new Date().getTime()
        stock[0].Pricing = stockData.Pricing
        stock[0].FinancialStatements = stockData.FinancialStatements
        await stock[0].save()
      } catch (err) { }
      res.status(200).json(stock[0])
    } else {
      res.status(200).json(stock[0])
    }
  } catch (err) {
    res.status(404).json({ message: err.message })
    console.log(err)
  }
  console.timeEnd('Time');
}



const fetchStockData = async (ticker) => {
  const stockData = {

    ticker: ticker,
    name: '',
    description: '',
    exchange: '',
    currency: '',
    sector: '',
    industry: '',
    latestSharesOutstanding: '',
    pre5yrsCAGR: 0,
    Pricing: {
      lastPrice: '',
      lastMarketCap: ''
    },
    FinancialStatements: {
      IncomeStatement: {},
      BalanceSheet: {},
      CashflowStatement: {}
    },
    Ratios: {
      Valuation: {
        annualReports: [],
        quarterlyReports: []
      },
      Profitability: {
        annualReports: [],
        quarterlyReports: []
      },
      FinancialStability: {
        annualReports: [],
        quarterlyReports: []
      }
    }
  };

  await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker.toUpperCase()}&apikey=OJZMTHYUWXIPPWQU`)
    .then(response => response.json())
    .then(res => {
      stockData.name = res.Name
      stockData.description = res.Description
      stockData.exchange = res.Exchange
      stockData.currency = res.Currency
      stockData.sector = res.Sector
      stockData.industry = res.Industry
      stockData.beta = res.Beta
      stockData.pe = res.TrailingPE
      stockData.forwardPe = res.ForwardPE
      stockData.pb = res.PriceToBookRatio
      stockData.dividendYield = res.DividendYield
      stockData.latestSharesOutstanding = Number(res.SharesOutstanding)

    })

  await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker.toUpperCase()}&apikey=OJZMTHYUWXIPPWQU`)
    .then(response => response.json())
    .then(res => {

      stockData.FinancialStatements.IncomeStatement = res
      //console.log(stockData.FinancialStatements.IncomeStatement)
      delete stockData.FinancialStatements.IncomeStatement.symbol
      stockData.FinancialStatements.IncomeStatement.annualReports.forEach(item => {
        item.totalRevenue = Number(item.costofGoodsAndServicesSold) + Number(item.grossProfit)
      })

      stockData.FinancialStatements.IncomeStatement.quarterlyReports.forEach(item => {
        item.totalRevenue = Number(item.costofGoodsAndServicesSold) + Number(item.grossProfit)
      })
    })

  await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker.toUpperCase()}&apikey=OJZMTHYUWXIPPWQU`)
    .then(response => response.json())
    .then(res => {

      stockData.FinancialStatements.BalanceSheet = res
      delete stockData.FinancialStatements.BalanceSheet.symbol

    })


  await fetch(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${ticker.toUpperCase()}&apikey=OJZMTHYUWXIPPWQU`)
    .then(response => response.json())
    .then(res => {

      stockData.FinancialStatements.CashflowStatement = res
      delete stockData.FinancialStatements.CashflowStatement.symbol
      stockData.FinancialStatements.CashflowStatement.annualReports.forEach(item => {
        item.freeCashflow = Number(item.operatingCashflow - item.capitalExpenditures).toString()
      })
      stockData.FinancialStatements.CashflowStatement.quarterlyReports.forEach(item => {
        item.freeCashflow = Number(item.operatingCashflow - item.capitalExpenditures).toString()
      })

    })

  await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker.toUpperCase()}&interval=60min&apikey=OJZMTHYUWXIPPWQU`)
    .then(res => res.json())
    .then(res => {
      stockData.Pricing.lastPrice = Number(Object.values(res['Time Series (60min)'])[0]['4. close'])
      stockData.Pricing.lastMarketCap = stockData.Pricing.lastPrice * stockData.latestSharesOutstanding
    })

  const Income_quarterlyReports = stockData.FinancialStatements.IncomeStatement.quarterlyReports
  const Cashflow_quarterlyReports = stockData.FinancialStatements.CashflowStatement.quarterlyReports

  const Income_TTM = {
    fiscalDateEnding: "TTM",
    reportedCurrency: "USD",
    grossProfit: 0,
    totalRevenue: 0,
    costOfRevenue: 0,
    costofGoodsAndServicesSold: 0,
    operatingIncome: 0,
    sellingGeneralAndAdministrative: 0,
    researchAndDevelopment: 0,
    operatingExpenses: 0,
    investmentIncomeNet: 0,
    netInterestIncome: 0,
    interestIncome: 0,
    interestExpense: 0,
    nonInterestIncome: 0,
    otherNonOperatingIncome: 0,
    depreciation: 0,
    depreciationAndAmortization: 0,
    incomeBeforeTax: 0,
    incomeTaxExpense: 0,
    interestAndDebtExpense: 0,
    netIncomeFromContinuingOperations: 0,
    comprehensiveIncomeNetOfTax: 0,
    ebit: 0,
    ebitda: 0,
    netIncome: 0

  };


  const Cashflow_TTM = {
    fiscalDateEnding: "TTM",
    reportedCurrency: "USD",
    operatingCashflow: 0,
    paymentsForOperatingActivities: 0,
    proceedsFromOperatingActivities: 0,
    changeInOperatingLiabilities: 0,
    changeInOperatingAssets: 0,
    depreciationDepletionAndAmortization: 0,
    capitalExpenditures: 0,
    changeInReceivables: 0,
    changeInInventory: 0,
    profitLoss: 0,
    cashflowFromInvestment: 0,
    cashflowFromFinancing: 0,
    proceedsFromRepaymentsOfShortTermDebt: 0,
    paymentsForRepurchaseOfCommonStock: 0,
    paymentsForRepurchaseOfEquity: 0,
    paymentsForRepurchaseOfPreferredStock: 0,
    dividendPayout: 0,
    dividendPayoutCommonStock: 0,
    dividendPayoutPreferredStock: 0,
    proceedsFromIssuanceOfCommonStock: 0,
    proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: 0,
    proceedsFromIssuanceOfPreferredStock: 0,
    proceedsFromRepurchaseOfEquity: 0,
    proceedsFromSaleOfTreasuryStock: 0,
    changeInCashAndCashEquivalents: 0,
    changeInExchangeRate: 0,
    netIncome: 0,
    freeCashflow: 0
  };


  try {
    for (let i = 0; i < 4; i++) {
      Income_TTM.grossProfit += Number(Income_quarterlyReports[i].grossProfit);
      Income_TTM.totalRevenue += Number(Income_quarterlyReports[i].totalRevenue);
      Income_TTM.costOfRevenue += Number(Income_quarterlyReports[i].costOfRevenue);
      Income_TTM.costofGoodsAndServicesSold += Number(Income_quarterlyReports[i].costofGoodsAndServicesSold);
      Income_TTM.operatingIncome += Number(Income_quarterlyReports[i].operatingIncome);
      Income_TTM.sellingGeneralAndAdministrative += Number(Income_quarterlyReports[i].sellingGeneralAndAdministrative);
      Income_TTM.researchAndDevelopment += Number(Income_quarterlyReports[i].researchAndDevelopment);
      Income_TTM.operatingExpenses += Number(Income_quarterlyReports[i].operatingExpenses);
      Income_TTM.investmentIncomeNet += Number(Income_quarterlyReports[i].investmentIncomeNet);
      Income_TTM.netInterestIncome += Number(Income_quarterlyReports[i].netInterestIncome);
      Income_TTM.interestIncome += Number(Income_quarterlyReports[i].interestIncome);
      Income_TTM.interestExpense += Number(Income_quarterlyReports[i].interestExpense);
      Income_TTM.nonInterestIncome += Number(Income_quarterlyReports[i].nonInterestIncome);
      Income_TTM.otherNonOperatingIncome += Number(Income_quarterlyReports[i].otherNonOperatingIncome);
      Income_TTM.depreciation += Number(Income_quarterlyReports[i].depreciation);
      Income_TTM.depreciationAndAmortization += Number(Income_quarterlyReports[i].depreciationAndAmortization);
      Income_TTM.incomeBeforeTax += Number(Income_quarterlyReports[i].incomeBeforeTax);
      Income_TTM.incomeTaxExpense += Number(Income_quarterlyReports[i].incomeTaxExpense);
      Income_TTM.interestAndDebtExpense += Number(Income_quarterlyReports[i].interestAndDebtExpense);
      Income_TTM.netIncomeFromContinuingOperations += Number(Income_quarterlyReports[i].netIncomeFromContinuingOperations);
      Income_TTM.comprehensiveIncomeNetOfTax += Number(Income_quarterlyReports[i].comprehensiveIncomeNetOfTax);
      Income_TTM.ebit += Number(Income_quarterlyReports[i].ebit);
      Income_TTM.ebitda += Number(Income_quarterlyReports[i].ebitda);
      Income_TTM.netIncome += Number(Income_quarterlyReports[i].netIncome);
    }

    for (let i = 0; i < 4; i++) {
      Cashflow_TTM.operatingCashflow += Number(Cashflow_quarterlyReports[i].operatingCashflow);
      Cashflow_TTM.paymentsForOperatingActivities += Number(Cashflow_quarterlyReports[i].paymentsForOperatingActivities);
      Cashflow_TTM.proceedsFromOperatingActivities += Number(Cashflow_quarterlyReports[i].proceedsFromOperatingActivities);
      Cashflow_TTM.changeInOperatingLiabilities += Number(Cashflow_quarterlyReports[i].changeInOperatingLiabilities);
      Cashflow_TTM.changeInOperatingAssets += Number(Cashflow_quarterlyReports[i].changeInOperatingAssets);
      Cashflow_TTM.depreciationDepletionAndAmortization += Number(Cashflow_quarterlyReports[i].depreciationDepletionAndAmortization);
      Cashflow_TTM.capitalExpenditures += Number(Cashflow_quarterlyReports[i].capitalExpenditures);
      Cashflow_TTM.changeInReceivables += Number(Cashflow_quarterlyReports[i].changeInReceivables);
      Cashflow_TTM.changeInInventory += Number(Cashflow_quarterlyReports[i].changeInInventory);
      Cashflow_TTM.profitLoss += Number(Cashflow_quarterlyReports[i].profitLoss);
      Cashflow_TTM.cashflowFromInvestment += Number(Cashflow_quarterlyReports[i].cashflowFromInvestment);
      Cashflow_TTM.cashflowFromFinancing += Number(Cashflow_quarterlyReports[i].cashflowFromFinancing);
      Cashflow_TTM.proceedsFromRepaymentsOfShortTermDebt += Number(Cashflow_quarterlyReports[i].proceedsFromRepaymentsOfShortTermDebt);
      Cashflow_TTM.paymentsForRepurchaseOfCommonStock += Number(Cashflow_quarterlyReports[i].paymentsForRepurchaseOfCommonStock);
      Cashflow_TTM.paymentsForRepurchaseOfEquity += Number(Cashflow_quarterlyReports[i].paymentsForRepurchaseOfEquity);
      Cashflow_TTM.paymentsForRepurchaseOfPreferredStock += Number(Cashflow_quarterlyReports[i].paymentsForRepurchaseOfPreferredStock);
      Cashflow_TTM.dividendPayout += Number(Cashflow_quarterlyReports[i].dividendPayout);
      Cashflow_TTM.dividendPayoutCommonStock += Number(Cashflow_quarterlyReports[i].dividendPayoutCommonStock);
      Cashflow_TTM.dividendPayoutPreferredStock += Number(Cashflow_quarterlyReports[i].dividendPayoutPreferredStock);
      Cashflow_TTM.proceedsFromIssuanceOfCommonStock += Number(Cashflow_quarterlyReports[i].proceedsFromIssuanceOfCommonStock);
      Cashflow_TTM.proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet += Number(Cashflow_quarterlyReports[i].proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet);
      Cashflow_TTM.proceedsFromIssuanceOfPreferredStock += Number(Cashflow_quarterlyReports[i].proceedsFromIssuanceOfPreferredStock);
      Cashflow_TTM.proceedsFromRepurchaseOfEquity += Number(Cashflow_quarterlyReports[i].proceedsFromRepurchaseOfEquity);
      Cashflow_TTM.proceedsFromSaleOfTreasuryStock += Number(Cashflow_quarterlyReports[i].proceedsFromSaleOfTreasuryStock);
      Cashflow_TTM.changeInCashAndCashEquivalents += Number(Cashflow_quarterlyReports[i].changeInCashAndCashEquivalents);
      Cashflow_TTM.changeInExchangeRate += Number(Cashflow_quarterlyReports[i].changeInExchangeRate);
      Cashflow_TTM.netIncome += Number(Cashflow_quarterlyReports[i].netIncome);
      Cashflow_TTM.freeCashflow += Number(Cashflow_quarterlyReports[i].freeCashflow);
    }
  } catch {
    stockData.FinancialStatements.IncomeStatement.annualReports.unshift({})
    stockData.FinancialStatements.CashflowStatement.annualReports.unshift({})
  }

  stockData.FinancialStatements.IncomeStatement.annualReports.unshift(Income_TTM)
  stockData.FinancialStatements.CashflowStatement.annualReports.unshift(Cashflow_TTM)


  for (let i = 0; i < stockData.FinancialStatements.BalanceSheet.annualReports.length && i < stockData.FinancialStatements.IncomeStatement.annualReports.length; i++) {
    // Find the corresponding fiscalDateEnding in the IncomeStatement object
    const fiscalDateEnding = stockData.FinancialStatements.BalanceSheet.annualReports[i].fiscalDateEnding;
    const costofGoodsAndServicesSold = stockData.FinancialStatements.IncomeStatement.annualReports.find((item) => item.fiscalDateEnding === fiscalDateEnding).costofGoodsAndServicesSold;
    const grossProfit = stockData.FinancialStatements.IncomeStatement.annualReports.find((item) => item.fiscalDateEnding === fiscalDateEnding).grossProfit;
    const operatingIncome = stockData.FinancialStatements.IncomeStatement.annualReports.find((item) => item.fiscalDateEnding === fiscalDateEnding).operatingIncome;
    const netIncome = stockData.FinancialStatements.IncomeStatement.annualReports.find((item) => item.fiscalDateEnding === fiscalDateEnding).netIncome;
    const assets = stockData.FinancialStatements.BalanceSheet.annualReports[i].totalAssets;
    const equity = stockData.FinancialStatements.BalanceSheet.annualReports[i].totalShareholderEquity;
    const totalCurrentAssets = stockData.FinancialStatements.BalanceSheet.annualReports[i].totalCurrentAssets;
    const totalCurrentLiabilities = stockData.FinancialStatements.BalanceSheet.annualReports[i].totalCurrentLiabilities;
    const inventory = stockData.FinancialStatements.BalanceSheet.annualReports[i].inventory;
    const revenue = Number(costofGoodsAndServicesSold) + Number(grossProfit)

    // Calculate the ROA
    const returnOnAssets = Number((netIncome / assets).toFixed(5));
    const returnOnEquity = Number((netIncome / equity).toFixed(5))
    const grossMargin = Number((grossProfit / revenue).toFixed(5))
    const operatingMargin = Number((operatingIncome / revenue).toFixed(5))
    const netMargin = Number((netIncome / revenue).toFixed(5))
    // console.log(Number(totalCurrentAssets), Number(inventory), Number(totalCurrentLiabilities))
    const quickRatio = Number(((totalCurrentAssets - inventory) / totalCurrentLiabilities).toFixed(2))
    const currentRatio = Number((totalCurrentAssets / totalCurrentLiabilities).toFixed(2))
    const assetTurnover = Number((revenue / assets).toFixed(2))
    const inventoryTurnover = Number((costofGoodsAndServicesSold / inventory).toFixed(2))

    // Create the object and push it into the annualReports array in the Valuation object
    const profitability = {
      fiscalDateEnding: fiscalDateEnding,
      returnOnAssets: returnOnAssets,
      returnOnEquity: returnOnEquity,
      grossMargin: grossMargin,
      operatingMargin: operatingMargin,
      netMargin: netMargin,
    };

    const financialStability = {
      fiscalDateEnding, fiscalDateEnding,
      quickRatio: quickRatio,
      currentRatio: currentRatio,
      assetTurnover: assetTurnover,
      inventoryTurnover: inventoryTurnover,
    }


    stockData.Ratios.Profitability.annualReports.push(profitability);
    stockData.Ratios.FinancialStability.annualReports.push(financialStability);
  }

  const reversedReports = [...stockData.FinancialStatements.IncomeStatement.annualReports].reverse();

  const startValue = reversedReports[0].totalRevenue;
  const endValue = reversedReports[stockData.FinancialStatements.IncomeStatement.annualReports.length - 1].totalRevenue;
  const numYears = stockData.FinancialStatements.IncomeStatement.annualReports.length - 1;

  stockData.pre5yrsCAGR = Math.pow(endValue / startValue, 1 / numYears) - 1;

  return stockData

}

export const likeStock = async (req, res) => {
  function findMostFrequentString(arr) {
    let counts = {};
    let maxCount = 0;
    let mostFrequentString = null;

    for (let i = 0; i < arr.length; i++) {
      const currentString = arr[i];

      // Increase the count for the current string
      if (counts[currentString]) {
        counts[currentString]++;
      } else {
        counts[currentString] = 1;
      }

      // Update maxCount and mostFrequentString if necessary
      if (counts[currentString] > maxCount) {
        maxCount = counts[currentString];
        mostFrequentString = currentString;
      }
    }

    return mostFrequentString;
  }
  try {
    const id = req.params.id.toUpperCase()
    console.log(id)

    if (!req.userId) return res.json({ message: 'Unathenticated' })

    const user = await User.findById(req.userId)
    const stock = await Stock.findOne({ ticker: id })

    const index = stock.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
      stock.likes.push(req.userId)
      user.likedStocks.push(id)
      user.likedStocksSector.push(stock.sector)
      user.likedStocksIndustry.push(stock.industry)
      user.preferences.stocks.marketCap = ((user.preferences.stocks.marketCap * (user.likedStocks.length - 1)) + stock.Pricing.lastMarketCap) / user.likedStocks.length
      user.preferences.stocks.beta = ((user.preferences.stocks.beta * (user.likedStocks.length - 1)) + stock.beta) / user.likedStocks.length
      user.preferences.stocks.sector = findMostFrequentString(user.likedStocksSector)
      user.preferences.stocks.industry = findMostFrequentString(user.likedStocksIndustry)
      user.preferences.stocks.pe = ((user.preferences.stocks.pe * (user.likedStocks.length - 1)) + stock.pe) / user.likedStocks.length
      user.preferences.stocks.forwardPe = ((user.preferences.stocks.forwardPe * (user.likedStocks.length - 1)) + stock.forwardPe) / user.likedStocks.length
      user.preferences.stocks.pb = ((user.preferences.stocks.pb * (user.likedStocks.length - 1)) + stock.pb) / user.likedStocks.length
      user.preferences.stocks.dividendYield = ((user.preferences.stocks.dividendYield * (user.likedStocks.length - 1)) + stock.dividendYield) / user.likedStocks.length
      user.preferences.stocks.growth = ((user.preferences.stocks.growth * (user.likedStocks.length - 1)) + stock.pre5yrsCAGR) / user.likedStocks.length
      user.preferences.stocks.grossMargin = ((user.preferences.stocks.grossMargin * (user.likedStocks.length - 1)) + stock.Ratios.Profitability.annualReports[0].grossMargin) / user.likedStocks.length
      user.preferences.stocks.netMargin = ((user.preferences.stocks.netMargin * (user.likedStocks.length - 1)) + stock.Ratios.Profitability.annualReports[0].netMargin) / user.likedStocks.length
      //user.preferences.stocks.roic = ((user.preferences.stocks.beta * (user.likedStocks.length - 1)) + stock.beta) / user.likedStocks.length
      if (stock.FinancialStatements.IncomeStatement.annualReports[0].netIncome > 0) {
        user.preferences.stocks.profitable = ((user.preferences.stocks.beta * (user.likedStocks.length - 1)) + 1) / user.likedStocks.length
      } else {
        user.preferences.stocks.profitable = ((user.preferences.stocks.beta * (user.likedStocks.length - 1)) + 0) / user.likedStocks.length
      }

      //
    } else {
      // stock.likes = stock.likes.filter((id) => id !== String(req.userId))
      // user.likedStocks = []
      // user.preferences.stocks.marketCap = 0

      stock.likes = stock.likes.filter((id) => id !== String(req.userId))
      user.likedStocks = user.likedStocks.filter((ticker) => ticker !== id)
      if (user.likedStocks.length) {
        user.preferences.stocks.marketCap = (user.preferences.stocks.marketCap * (user.likedStocks.length + 1) - stock.Pricing.lastMarketCap) / user.likedStocks.length
        user.preferences.stocks.beta = (user.preferences.stocks.beta * (user.likedStocks.length + 1) - stock.beta) / user.likedStocks.length
        const sectorIndexToRemove = user.likedStocksSector.indexOf(stock.sector);
        if (sectorIndexToRemove !== -1) {
          user.likedStocksSector.splice(sectorIndexToRemove, 1);
        }
        user.preferences.stocks.sector = findMostFrequentString(user.likedStocksSector)
        const industryIndexToRemove = user.likedStocksIndustry.indexOf(stock.industry);
        if (industryIndexToRemove !== -1) {
          user.likedStocksIndustry.splice(industryIndexToRemove, 1);
        }
        user.preferences.stocks.industry = findMostFrequentString(user.likedStocksIndustry)
        user.preferences.stocks.pe = (user.preferences.stocks.pe * (user.likedStocks.length + 1) - stock.pe) / user.likedStocks.length
        user.preferences.stocks.forwardPe = (user.preferences.stocks.forwardPe * (user.likedStocks.length + 1) - stock.forwardPe) / user.likedStocks.length
        user.preferences.stocks.pb = (user.preferences.stocks.pb * (user.likedStocks.length + 1) - stock.pb) / user.likedStocks.length
        user.preferences.stocks.dividendYield = (user.preferences.stocks.dividendYield * (user.likedStocks.length + 1) - stock.dividendYield) / user.likedStocks.length
        user.preferences.stocks.growth = (user.preferences.stocks.growth * (user.likedStocks.length + 1) - stock.pre5yrsCAGR) / user.likedStocks.length
        user.preferences.stocks.grossMargin = (user.preferences.stocks.beta * (user.likedStocks.length + 1) - stock.Ratios.Profitability.annualReports[0].grossMargin) / user.likedStocks.length
        user.preferences.stocks.netMargin = (user.preferences.stocks.beta * (user.likedStocks.length + 1) - stock.Ratios.Profitability.annualReports[0].netMargin) / user.likedStocks.length
        //user.preferences.stocks.roic = (user.preferences.stocks.beta * (user.likedStocks.length + 1) - stock.beta) / user.likedStocks.length
        if (stock.FinancialStatements.IncomeStatement.annualReports[0].netIncome > 0) {
          user.preferences.stocks.profitable = (user.preferences.stocks.beta * (user.likedStocks.length + 1) - 1) / user.likedStocks.length
        } else {
          user.preferences.stocks.profitable = (user.preferences.stocks.beta * (user.likedStocks.length + 1) - 0) / user.likedStocks.length
        }

        //
      } else {
        user.preferences.stocks.marketCap = 0
        user.preferences.stocks.beta = 0
        user.preferences.stocks.sector = ''
        user.preferences.stocks.industry = ''
        user.preferences.stocks.pe = 0
        user.preferences.stocks.forwardPe = 0
        user.preferences.stocks.pb = 0
        user.preferences.stocks.dividendYield = 0
        user.preferences.stocks.growth = 0
        user.preferences.stocks.grossMargin = 0
        user.preferences.stocks.netMargin = 0
        user.preferences.stocks.roic = 0
        user.preferences.stocks.profitable = 0
        //
      }

    }

    let updatedStock
    let updatedUser

    updatedStock = await Stock.findOneAndUpdate({ ticker: id }, stock, { new: true })
    updatedUser = await User.findByIdAndUpdate(req.userId, user, { new: true })

    res.json({ 'updatedStock': updatedStock, 'updatedUser': updatedUser })

  } catch (err) {
    console.log(err)

    res.status(404).json({ message: err.message })
  }
}



// const fetchStockData = async (ticker) => {
//   let cik;
//   const oldFilings = []
//   const listOf10K_New = []
//   const listOf10K_Old = []
//   const listOfAccNum_New = []
//   const listOfAccNum_Old = []
//   const listOfCurrentMetrics = []
//   const listOfImportantMetrics = []
//   const listOfImportantMetrics_IncomeStatement = [
//     'CostOfGoodsAndServicesSold',
//     'GrossProfit',
//     'NetIncomeLoss',
//     'NonoperatingIncomeExpense',
//     'OperatingIncomeLoss',
//     'OperatingExpenses',
//   ]
//   const listOfImportantMetrics_BalanceSheet = [
//     'Assets',
//     'AssetsCurrent',
//     'AssetsNoncurrent',
//     'Liabilities',
//     'LiabilitiesCurrent',
//     'LiabilitiesNoncurrent',
//   ]
//   const listOfImportantMetrics_CashflowStatement = [
//     '',
//   ]
//   const stockData = {
//     ticker: ticker,
//     name: '',
//     FinancialStatements: {
//       IncomeStatement: {},
//       BalanceSheet: {},
//       CashflowStatement: {}
//     }
//   };
//   const listOfEndDates = []

//   await fetch("https://www.sec.gov/files/company_tickers.json")
//     .then(response => response.json())
//     .then(response => {
//       //NEEDS OPTIMIZING
//       const tickers = Object.keys(response).map(key => ({
//         ticker: response[key].ticker,
//         CIK: response[key].cik_str
//       }))
//       tickers.forEach(obj => {
//         if (obj.ticker.toLowerCase() == ticker.toLowerCase()) [
//           cik = obj.CIK.toString().padStart(10, '0')
//         ]
//       })


//     })
//   await fetch(`https://data.sec.gov/submissions/CIK${cik}.json`)
//     .then(res => res.json())
//     .then(res => {
//       console.log(res.name)
//       stockData['name'] = res.name
//       res.filings.recent.form.forEach((value, index) => {
//         if (value == '10-K') {
//           listOf10K_New.push(index)
//           listOfAccNum_New.push(res.filings.recent.accessionNumber[index])
//         }
//       })

//       oldFilings.push(res.filings.files[0].name)
//     })
//   await fetch(`https://data.sec.gov/submissions/${oldFilings[0]}`)
//     .then(res => res.json())
//     .then(res => {
//       res.form.forEach((value, index) => {
//         if (value == '10-K') {
//           listOf10K_Old.push(index)
//           listOfAccNum_Old.push(res.accessionNumber[index])
//         }
//       })

//     })
//   await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`)
//     .then(response => response.json())
//     .then(res => {

//       const listOfMetrics = res.facts['us-gaap']

//       for (let metric in listOfMetrics) {
//         let unitType
//         let statement

//         if (listOfMetrics[metric].units.USD != undefined) {
//           unitType = 'USD'
//         } else if (listOfMetrics[metric].units.shares != undefined) {
//           unitType = 'shares'
//         } else if (listOfMetrics[metric].units.pure != undefined) {
//           unitType = 'pure'
//         } else if (listOfMetrics[metric].units['USD/shares'] != undefined) {
//           unitType = 'USD/shares'
//         } else if (listOfMetrics[metric].units['Year'] != undefined) {
//           unitType = 'Year'
//         } else if (listOfMetrics[metric].units['Store'] != undefined) {
//           unitType = 'Store'
//         } else {

//         }

//         if (listOfImportantMetrics_IncomeStatement.includes(metric)) {
//           statement = 'IncomeStatement'
//         } else if (listOfImportantMetrics_BalanceSheet.includes(metric)) {
//           statement = 'BalanceSheet'
//         } else if (listOfImportantMetrics_CashflowStatement.includes(metric)) {
//           statement = 'CashflowStatement'
//         }

//         listOfEndDates.push(
//           {
//             name: metric,
//             unitType: unitType,
//             statement: statement,
//             endDate: listOfMetrics[metric].units[unitType][listOfMetrics[metric].units[unitType].length - 1].end,
//             startDate: listOfMetrics[metric].units[unitType][0].end,
//             endDateData: new Date(listOfMetrics[metric].units[unitType][listOfMetrics[metric].units[unitType].length - 1].end)
//           })

//       }

//       listOfEndDates.slice().sort((a, b) => b.endDateData - a.endDateData).forEach(unit => {
//         if (unit.endDate == '2022-12-31') {
//           listOfCurrentMetrics.push(unit)
//         }
//       })

//       listOfCurrentMetrics.forEach(u => {
//         if (u.statement) {
//           listOfImportantMetrics.push(u)
//         }

//       })

//       listOfImportantMetrics.forEach(unit => {
//         stockData['FinancialStatements'][unit.statement][unit.name] = []
//       })

//       stockData['FinancialStatements']['IncomeStatement']['TotalRevenue'] = []
//       stockData['FinancialStatements']['IncomeStatement']['PretaxIncome'] = []
//       stockData['FinancialStatements']['IncomeStatement']['Taxes'] = []
//       stockData['FinancialStatements']['BalanceSheet']['Equity'] = []

//       for (let metric of listOfImportantMetrics) {
//         const arr = []
//         listOfMetrics[`${metric.name}`].units[metric.unitType].forEach(unit => {

//           if (listOfAccNum_New.includes(unit.accn) || listOfAccNum_Old.includes(unit.accn)) {
//             arr.push(unit)
//           }
//         })
//         const result = Object.values(arr.reduce((acc, curr) => {
//           if (!acc[parseInt(curr.end.slice(0, 4))] || curr.val > acc[parseInt(curr.end.slice(0, 4))].val) {
//             acc[parseInt(curr.end.slice(0, 4))] = curr;
//           }
//           return acc;
//         }, {}));

//         result.forEach(unit => {

//           stockData['FinancialStatements'][metric.statement][metric.name].push({ date: unit.end.slice(0, 4), value: Number((unit.val / 1000000000).toFixed(2)) })

//         })

//       }
//       // For Income Statement
//       for (let i = 0; i < stockData['FinancialStatements']['IncomeStatement']['GrossProfit'].length; i++) {
//         stockData['FinancialStatements']['IncomeStatement']['TotalRevenue'].push(
//           {
//             date: stockData['FinancialStatements']['IncomeStatement']['GrossProfit'][i].date,
//             value: Number((stockData['FinancialStatements']['IncomeStatement']['GrossProfit'][i].value + stockData['FinancialStatements']['IncomeStatement']['CostOfGoodsAndServicesSold'][i].value).toFixed(2))
//           })
//         stockData['FinancialStatements']['IncomeStatement']['PretaxIncome'].push(
//           {
//             date: stockData['FinancialStatements']['IncomeStatement']['GrossProfit'][i].date,
//             value: Number((stockData['FinancialStatements']['IncomeStatement']['OperatingIncomeLoss'][i].value - stockData['FinancialStatements']['IncomeStatement']['NonoperatingIncomeExpense'][i].value).toFixed(2))
//           })
//         stockData['FinancialStatements']['IncomeStatement']['Taxes'].push(
//           {
//             date: stockData['FinancialStatements']['IncomeStatement']['GrossProfit'][i].date,
//             value: Number((stockData['FinancialStatements']['IncomeStatement']['PretaxIncome'][i].value - stockData['FinancialStatements']['IncomeStatement']['NetIncomeLoss'][i].value).toFixed(2))
//           })
//       }

//       // For Balance Sheet
//       for (let i = 0; i < stockData['FinancialStatements']['BalanceSheet']['Assets'].length; i++) {
//         stockData['FinancialStatements']['BalanceSheet']['Equity'].push(
//           {
//             date: stockData['FinancialStatements']['BalanceSheet']['Assets'][i].date,
//             value: Number((stockData['FinancialStatements']['BalanceSheet']['Assets'][i].value - stockData['FinancialStatements']['BalanceSheet']['Liabilities'][i].value).toFixed(2))
//           })
//       }
//     })
//   return stockData
// }



