import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import CoinList from "./components";
import config from "./config/app";

function App() {
  const [currency, setCurrency] = useState(config.currencyList[0]);
  const [sortMode, setSortMode] = useState("RANK");

  return (
    <Container className="mt-5">
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Currency :</Navbar.Brand>
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                title={currency}
                menuVariant="dark"
              >
                {
                  config.currencyList.map((item, id) => {
                    return (<NavDropdown.Item onClick={() => {setCurrency(item)}} key={id}>{item}</NavDropdown.Item>);
                  })
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Button variant="primary" className="mx-2" onClick={() => { setSortMode("NAME"); }}>
            Order By Name
          </Button>
          <Button variant="primary" className="mx-2" onClick={() => { setSortMode("RANK"); }}>
            Order By Rank
          </Button>
        </Container>
      </Navbar>
      <CoinList currency={currency} mode={sortMode}/>
    </Container>
  );
}

export default App;
