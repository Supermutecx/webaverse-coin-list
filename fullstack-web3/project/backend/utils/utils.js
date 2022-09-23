const axios = require('axios');

const fetchBestExchange = async (coinId, currency) => {
    const query = new URLSearchParams();
    query.append("coinId", coinId);
    query.append("currency", currency);
    const apiUrl = `${process.env.MARKET_API}?${query.toString()}`;

    try {
        const apiResp = await axios.get(apiUrl);
        const sortedData = apiResp.data.sort((c1, c2) => c1.price > c2.price ? 1 : -1);
        return {
            "exchange": sortedData[0].exchange
        };
    } catch (error) {
        return [];
    }
}

const fetchSingleMarketList = async (symbol, currency) => {

    try {
        const coinList = await this.fetchCoinList(currency);
        const coin = await coinList.coins.filter(coin => coin.symbol == symbol);
        const resp = await fetchBestExchange(coin[0].id, currency);
        return resp;
    } catch (error) {
        return [];
    }
}

const fetchBatchMarketList = async (currency) => {
    try {
        const coinList = await this.fetchCoinList(currency);
        const resp = [];
        for (const coin of coinList.coins) {
            const exchange = await fetchBestExchange(coin.id, currency);
            resp.push(
                {
                    ...exchange,
                    "coinId": coin.symbol,
                }
            )
        }
        return resp;
    } catch (error) {
        return [];
    }
}

exports.fetchCoinList = async (currency) => {
    const query = new URLSearchParams();
    if(currency != undefined) query.append("currency", currency);
    const apiUrl = `${process.env.COIN_API}?${query.toString()}`;
    try {
        const apiResp = await axios.get(apiUrl);
        return apiResp.data;
    } catch (error) {
        return [];
    }
}

exports.fetchMarketList = async (symbol, currency) => {
    try {
        if(symbol == undefined) {
            const marketResp = await fetchBatchMarketList(currency);
            return marketResp;
        } else {
            const marketResp = await fetchSingleMarketList(symbol, currency);
            return marketResp;
        }
    } catch (error) {
        return [];
    }
}


