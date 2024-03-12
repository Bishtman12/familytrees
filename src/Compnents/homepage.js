import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';
import About from './about';
import FamilyTree from './tree';
import { AsyncPaginate } from "react-select-async-paginate";

function Homepage() {
  const [toggle, setToggle] = useState(false);
  const {
    search,
    handleSuggestions,
    getTreeData,
    handleSelection
  } = useGlobalContext();

  const [rendered, setRendered] = useState('full_tree');

  const switchComponent = () => {
    switch (rendered) {
      case 'full_tree':
        return <FamilyTree rendered={rendered} />;
      case 'search_tree':
        return <FamilyTree rendered={rendered} />;
      case 'about_me':
        return <About rendered={rendered} />;
      default:
        return <FamilyTree rendered={rendered} />;
    }
  };

  const closeOverlay = () => {
    setToggle(false);
  };

  return (
    <>
      <Nav>
        <Logo href='/' onClick={() => setRendered('full_tree')}>
          Family Tree
        </Logo>
        <SearchWrapper>
          <AsyncPaginate
            placeholder="Search your name here"
            value={search}
            onChange={handleSelection}
            loadOptions={handleSuggestions}
          />
        </SearchWrapper>
        <Menu>
          <Item>
            <Link onClick={() => {
              setRendered('full_tree');
              getTreeData();
            }}>
              Load Full Tree
            </Link>
          </Item>
          <Item>
            <Link onClick={() => setRendered('about_me')}>
              About me
            </Link>
          </Item>
          <Item>
            <Link onClick={() => setRendered('about_me')}>
              Contact Us
            </Link>
          </Item>
        </Menu>
        <NavIcon onClick={() => setToggle(!toggle)}>
          <Line open={toggle} />
          <Line open={toggle} />
          <Line open={toggle} />
        </NavIcon>
      </Nav>
      <Overlay open={toggle} onClick={closeOverlay}>
        <OverlayMenu open={toggle}>
          <Item>
            <AsyncPaginate
              placeholder="Search here"
              value={search}
              onChange={handleSelection}
              loadOptions={handleSuggestions}
            />
          </Item>
          <Item>
            <Link onClick={() => {
              setRendered('full_tree');
              getTreeData();
              closeOverlay();
            }}>
              Load Full Tree
            </Link>
          </Item>
          <Item>
            <Link onClick={() => {
              setRendered('about_me');
              closeOverlay();
            }}>
              About me
            </Link>
          </Item>
          <Item>
            <Link onClick={() => {
              setRendered('about_me');
              closeOverlay();
            }}>
              Contact us
            </Link>
          </Item>
        </OverlayMenu>
      </Overlay>
      {switchComponent()}
    </>
  );
}

const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background: #6a11cb;
  background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 0.9), rgba(37, 117, 252, 0.9));
  background: linear-gradient(to right, rgba(106, 17, 203, 0.9), rgba(37, 117, 252, 0.9));
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 25px;
  color: white;
`;

const SearchWrapper = styled.div`
  flex: 0.5;
  margin: 0 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  color:white;
  text-align:center;
  margin-top:20px;
  li:nth-child(2) {
    margin: 0px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Item = styled.li`
  margin: 0 10px;
  a {
    text-decoration: none;
    text-align: center;

    :hover {
      text-decoration: underline;
    }
  }
`;

const Link = styled.a`
  color: white;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const NavIcon = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  color : white;
  @media (min-width: 769px) {
    display: none;
  }
`;

const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: #fff;
  transition: width 0.4s ease-in-out;

  :nth-child(2) {
    width: ${props => (props.open ? "40%" : "70%")};
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  color:white;
  height: ${props => (props.open ? "100vh" : 0)};
  width: 100vw;
  background: #1c2022;
  transition: height 0.4s ease-in-out;
  overflow: hidden;
  z-index: 1;
`;

const OverlayMenu = styled.ul`
  list-style: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    opacity: ${props => (props.open ? 1 : 0)};
    font-size: 25px;
    margin: 10px 0;
    transition: opacity 0.4s ease-in-out;

    a {
      color: white;
      text-decoration: none;
      text-align: center;

      :hover {
        text-decoration: underline;
      }
    }
  }

  li:nth-child(2) {
    margin: 50px 0px;
  }
`;

export default Homepage;
