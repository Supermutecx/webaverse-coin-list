import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";

function CoinList(props) {
  const currency = props.currency;
  const mode = props.mode;

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
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
}

export default CoinList;
