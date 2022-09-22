const { successResponse, failResponse } = require("../helpers/methods")
const { fetchCoinList, fetchMarketList } = require("../utils/utils")

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async (req, res) => {
    res.send(
        successResponse("Express JS API Boiler Plate working like a charm...", {
            data: "here comes you payload..."
        })
    )
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.indexPost = async (req, res) => {
    res.send(
        successResponse("Express JS API Boiler Plate post api working like a charm...", {
            data: "here comes you payload...",
            request: req.body
        })
    )
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
 exports.exchange = async (req, res) => {
    try {
        const marketList = await fetchMarketList(req.query.coinId, req.query.currency);
        res.send(
            successResponse("Best Exchange Market from Coin API", marketList)
        )
    } catch (error) {
        res.send(
            failResponse(error.message ? error.message : "Failed to fetch data from Coin API")
        )
    }
}


exports.coin = async (req, res) => {

    try {
        const coinList = await fetchCoinList(req.query.baseCurrency)
        res.send(
            successResponse("Coin List based on the Selected Currency", coinList)
        )
    } catch (error) {
        res.send(
            failResponse(error.message ? error.message : "Failed to fetch data from Coin API")
        )
    }
}
