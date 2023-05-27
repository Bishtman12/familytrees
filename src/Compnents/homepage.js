import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';
import About from './about';
import FamilyTree from './tree';

function Homepage() {

    const [toggle, toggleNav] = useState(false);

    const {
        search,
        handleSuggestions,
        getTreeData,
        handleChange,
        handleSubmit,
        searchResults,
    } = useGlobalContext();

    const [rendered, setRendered] = React.useState('full_tree');

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

    const handleSuggestionClick = (suggestion) => {
        console.log("suggestion", suggestion)
        handleChange({ target: { value: suggestion } });
        handleSubmit();
        setRendered('search_tree');
    };

    return (
        <>
            <Nav>
                <Logo href='/' onClick={() => setRendered('full_tree')}>
                    Family Tree
                </Logo>
                <Search>
                    <SearchIcon className="fa fa-search" />
                    <SearchInput
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            handleChange(e);
                            handleSuggestions(e.target.value);
                        }}
                    />
                    {searchResults.length > 0 && (
                        <SuggestionsList>
                            {searchResults.map((suggestion) => (
                                <SuggestionItem
                                    key={suggestion}
                                    onClick={
                                        (e) =>
                                            handleSubmit(e)
                                    }
                                >
                                    {suggestion}
                                </SuggestionItem>
                            ))}
                        </SuggestionsList>
                    )}
                </Search>
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
                <NavIcon onClick={() => toggleNav(!toggle)}>
                    <Line open={toggle} />
                    <Line open={toggle} />
                    <Line open={toggle} />
                </NavIcon>
            </Nav>
            <Overlay open={toggle}>
                <OverlayMenu open={toggle}>
                    <OverlaySearch>
                        <OverlaySearchIcon className="fa fa-search" />
                        <OverlaySearchInput type="text" placeholder="Search..." />
                    </OverlaySearch>
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
                            Contact us
                        </Link>
                    </Item>
                </OverlayMenu>
            </Overlay>
            {switchComponent()}
        </>
    );
}
const SuggestionsList = styled.ul`
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 0;
`;

const SuggestionItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;

  :hover {
    background-color: #f1f1f1;
  }
`;
const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background: #141E30;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 25px;
  color: white;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;

  li:nth-child(2) {
    margin: 0px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Item = styled.li``;

const Link = styled.a`

  color: white;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const NavIcon = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  outline: none;

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
  position: absolute;
  height: ${props => (props.open ? "91vh" : 0)};
  width: 100vw;
  background: #1c2022;
  transition: height 0.4s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

const OverlayMenu = styled.ul`
  list-style: none;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);

  li {
    opacity: ${props => (props.open ? 1 : 0)};
    font-size: 25px;
    margin: 50px 0px;
    transition: opacity 0.4s ease-in-out;
  }

  li:nth-child(2) {
    margin: 50px 0px;
  }
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchIcon = styled.i`
  position: absolute;
  left: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  padding-left: 30px;
  border: none;
  border-radius: 25px;
  margin: 0 10px;
`;


const OverlaySearch = styled.form`
  display: flex;
  align-items: center;
  @media (min-width: 769px) {
    display: none;
  }
`;

const OverlaySearchIcon = styled.i`
  margin-right: 10px;
`;

const OverlaySearchInput = styled.input`
  padding: 5px;
  border: none;
  border-radius: 25px;
`;


export default Homepage