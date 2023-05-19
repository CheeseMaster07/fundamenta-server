
export const getHome = async (req, res) => {
  try {
    // fetch("https://www.sec.gov/include/ticker.txt")
    //   .then(response => response.text())
    //   .then(text => {
    //     const tickers = text.split(/\r?\n/).map(line => {
    //       const [symbol, CIK] = line.split("\t");
    //       return { symbol, CIK };
    //     });

    res.status(200).json('Home')
    //})
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}