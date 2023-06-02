import Stock from '../models/stock.js'

export const getStocks = async (req, res) => {
  // const stocks = await Stock.find()
  // stocks.forEach(stock => {
  //   console.log(stock.ticker)
  // })
  try {
    fetch("https://www.sec.gov/include/ticker.txt")
      .then(response => response.text())
      .then(text => {
        const tickers = text.split(/\r?\n/).map(line => {
          const [symbol, CIK] = line.split("\t");
          return { symbol, CIK };
        });

        res.status(200).json(tickers)
      })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getStock = async (req, res) => {
  console.time('Time');


  try {
    const ticker = req.params.id
    const stock = await Stock.find({ ticker: ticker })
    //console.log(stock)
    const currentTime = new Date().getTime()
    const lastUpdatedTime = stock[0]?.updatedAt
    const sixHoursInMilliseconds = 6 * 60 * 60 * 1000
    if (!stock.length) {
      console.time('fetching')
      const stockData = await fetchStockData(ticker)
      console.timeEnd('fetching')

      const newStockData = new Stock({
        ticker: stockData.ticker,
        name: stockData.name,
        description: stockData.description,
        exchange: stockData.exchange,
        currency: stockData.currency,
        sector: stockData.sector,
        industry: stockData.industry,
        updatedAt: new Date().getTime(),
        FinancialStatements: stockData.FinancialStatements,
        Ratios: stockData.Ratios
      })
      try {
        await newStockData.save()
      } catch { }
      res.status(200).json(stockData)
    } else if (currentTime - lastUpdatedTime > sixHoursInMilliseconds) {
      try {
        const stockData = await fetchStockData(ticker)
        console.log(stock[0])
        stock[0].ticker = ticker
        stock[0].name = stockData.name
        stock[0].description = stockData.description
        stock[0].exchange = stockData.exchange
        stock[0].currency = stockData.currency
        stock[0].sector = stockData.sector
        stock[0].industry = stockData.industry
        stock[0].updatedAt = new Date().getTime()
        stock[0].FinancialStatements = stockData.FinancialStatements
        await stock[0].save()
        console.log(stock[0].updatedAt)
      } catch (err) { }
      console.log(stock[0])
      res.status(200).json(stock[0])
    } else {
      res.status(200).json(stock[0])
    }
  } catch (err) {
    res.status(404).json({ message: err.message })
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

  await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker.toUpperCase()}&apikey=GN7K9CBY3UKBXCFO`)
    .then(response => response.json())
    .then(res => {
      stockData.name = res.Name
      stockData.description = res.Description
      stockData.exchange = res.Exchange
      stockData.currency = res.Currency
      stockData.sector = res.Sector
      stockData.industry = res.Industry

    })

  await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker.toUpperCase()}&apikey=GN7K9CBY3UKBXCFO`)
    .then(response => response.json())
    .then(res => {
      console.log('130')

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
  console.log('143')

  await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker.toUpperCase()}&apikey=GN7K9CBY3UKBXCFO`)
    .then(response => response.json())
    .then(res => {

      stockData.FinancialStatements.BalanceSheet = res
      delete stockData.FinancialStatements.BalanceSheet.symbol
      console.log('152')

    })


  await fetch(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${ticker.toUpperCase()}&apikey=GN7K9CBY3UKBXCFO`)
    .then(response => response.json())
    .then(res => {
      console.log('160')

      stockData.FinancialStatements.CashflowStatement = res
      delete stockData.FinancialStatements.CashflowStatement.symbol
      stockData.FinancialStatements.CashflowStatement.annualReports.forEach(item => {
        item.freeCashflow = Number(item.operatingCashflow - item.capitalExpenditures).toString()
      })
      stockData.FinancialStatements.CashflowStatement.quarterlyReports.forEach(item => {
        item.freeCashflow = Number(item.operatingCashflow - item.capitalExpenditures).toString()
      })
      console.log('170')

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

  stockData.FinancialStatements.IncomeStatement.annualReports.unshift(Income_TTM)
  stockData.FinancialStatements.CashflowStatement.annualReports.unshift(Cashflow_TTM)


  for (let i = 0; !(i < stockData.FinancialStatements.BalanceSheet.annualReports.length) && !(i < stockData.FinancialStatements.IncomeStatement.annualReports.length); i++) {
    // Find the corresponding fiscalDateEnding in the IncomeStatement object
    console.log(i)
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

  return stockData

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



