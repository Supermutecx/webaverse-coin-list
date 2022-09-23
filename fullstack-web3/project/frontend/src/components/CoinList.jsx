import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import config from "../config/app";
import TwitterLogo from "../assets/twitter.png";
import SiteLogo from "../assets/website.png";

function CoinList(props) {
  const currency = props.currency;
  const mode = props.mode;
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          setError(err.message);
          setCoinList([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currency]);

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
          {loading
            ? "Loading"
            : coinList.map((item, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{item.rank}</td>
                    <td>
                      <img
                        src={item.icon}
                        className="img-rounded float-left w-sm-50"
                        width="30px"
                        alt=""
                      />{" "}
                      {item.name} {item.symbol}
                    </td>
                    <td>{numberWithCommas(item.price.toFixed(2))}$</td>
                    <td>{item.priceChange1h}%</td>
                    <td>{item.priceChange1d}%</td>
                    <td>{item.priceChange1w}%</td>
                    <td>{numberWithCommas(item.marketCap?.toFixed(2))}</td>
                    <td>{numberWithCommas(item.volume?.toFixed(2))}</td>
                    <td className="d-flex">
                      <a href={item.websiteUrl} target="_blank">
                        <img
                          src={SiteLogo}
                          className="img-rounded float-left w-sm-50"
                          width="30px"
                          alt={item.name}
                        />
                      </a>{" "}
                      <a href={item.twitterUrl} target="_blank">
                        <img
                          src={TwitterLogo}
                          className="img-rounded float-left w-sm-50"
                          width="30px"
                          alt={item.name}
                        />
                      </a>
                    </td>
                    <td>
                        Binance
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </Container>
  );
}

export default CoinList;
