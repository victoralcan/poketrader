import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap';
import pokemonTitle from '../../assets/pokemon_title.png';
import pokeball from '../../assets/pokeball.png';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (): void => setIsOpen(!isOpen);
  const content = document.getElementById('root');
  const contentWidth = content ? content.clientWidth : 1024;
  const mobile = contentWidth <= 992;
  return (
    <Navbar expand="lg" className="sticky-top shadow">
      {/* eslint-disable-next-line */}
      <div onClick={mobile ? toggle : () => {}}>
        <img
          src={pokeball}
          alt="Pokeball"
          style={{
            width: '150px',
          }}
        />
        <img
          src={pokemonTitle}
          alt="Pokemon Trader"
          style={{
            width: '200px',
          }}
        />
      </div>
      <NavbarToggler onClick={toggle}>+</NavbarToggler>
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <Link className="pl-5 pr-3 text-decoration-none" to="/">
            <h4>Simulate Trade</h4>
          </Link>
          <Link className="px-3 text-decoration-none" to="/trades/history">
            <h4>Trades History</h4>
          </Link>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
