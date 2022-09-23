import React, { useEffect, useState } from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import config from "../config/app";
import TwitterLogo from "../assets/twitter.png";
import SiteLogo from "../assets/website.png";

function CoinList(props) {
  const currency = props.currency;
  const mode = props.mode;
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exchangeList, setExchangeList] = useState([]);

  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (mode == "RANK") {
      coinList.sort((c1, c2) => (c1.rank > c2.rank ? 1 : -1));
      setCoinList([...coinList]);
    } else {
      coinList.sort((c1, c2) =>
        c1.name.toLowerCase()[0] > c2.name.toLowerCase()[0] ? 1 : -1
      );
      setCoinList([...coinList]);
    }
  }, [mode]);

  useEffect(() => {
    setLoading(true);
    if (currency != null) {
      fetch(`${config.backendUrl}/coin-route?currency=${currency}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((actualData) => {
          if (actualData.status == true) {
            setCoinList(actualData.data.coins);
          }
        })
        .catch((err) => {
          setCoinList([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currency]);

  useEffect(async () => {
    if (loading == false) {
      for await (const coin of coinList) {
        const existList = exchangeList.filter(
          (item) => item.coinId == coin.id && item.currency == currency
        );
        if (existList.length == 0) {
          const apiResp = await fetch(
            `${config.backendUrl}/exchange-route?coinId=${coin.symbol}&currency=${currency}`
          );
          if (apiResp.status == 200) {
            const jsonResp = await apiResp.json();

            if (existList.length > 0) {
              // Update if exist
              exchangeList.map((item) => {
                if (item.coinId == coin.id && item.currency == currency) {
                  item.exchange = jsonResp.data.exchange;
                }
                return item;
              });
            } else {
              // Push if not exist
              exchangeList.push({
                coinId: coin.id,
                currency: currency,
                exchange: jsonResp.data.exchange,
              });
            }
            setExchangeList([...exchangeList]);
          }
        }
      }
    }
  }, [loading]);

  useEffect(() => {
    const mergedList = coinList.map((itm) => ({
      ...exchangeList.find(
        (item) => item.coinId === itm.id && item.currency == currency && item
      ),
      ...itm,
    }));
    setCoinList(mergedList);
  }, [exchangeList, currency]);

  return (
    <Container className="mt-3">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Marketcap</th>
            <th>Volume(24h)</th>
            <th>Links</th>
            <th>Best Exchange</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading</td>
            </tr>
          ) : (
            coinList.map((item, id) => {
              return (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{item?.rank}</td>
                  <td>
                    <img
                      src={item?.icon}
                      className="img-rounded float-left w-sm-50"
                      width="30px"
                      alt=""
                    />{" "}
                    {item?.name} {item?.symbol}
                  </td>
                  <td>{numberWithCommas(item?.price.toFixed(2))}$</td>
                  <td>{item?.priceChange1h}%</td>
                  <td>{item?.priceChange1d}%</td>
                  <td>{item?.priceChange1w}%</td>
                  <td>{numberWithCommas(item?.marketCap?.toFixed(2))}</td>
                  <td>{numberWithCommas(item?.volume?.toFixed(2))}</td>
                  <td className="d-flex">
                    <a href={item?.websiteUrl} target="_blank">
                      <img
                        src={SiteLogo}
                        className="img-rounded float-left w-sm-50"
                        width="30px"
                        alt={item?.name}
                      />
                    </a>{" "}
                    <a href={item?.twitterUrl} target="_blank">
                      <img
                        src={TwitterLogo}
                        className="img-rounded float-left w-sm-50"
                        width="30px"
                        alt={item?.name}
                      />
                    </a>
                  </td>
                  <td>{item?.exchange ? item?.exchange : (<Spinner animation="border" role="status"/>)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default CoinList;
