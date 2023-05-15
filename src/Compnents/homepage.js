import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';
import About from './about';
import FamilyTree from './tree';

function Homepage() {
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
        handleChange({ target: { value: suggestion } });
        handleSubmit();
        setRendered('search_tree');
    };

    return (
        <HomepageStyled>
            <header>
                <div className='search-container'>
                    <div className='logo'>
                        <a href='/' onClick={() => setRendered('full_tree')}>
                            Family Tree
                        </a>
                    </div>
                    <form action='' className='search-form' onSubmit={handleSubmit}>
                        <div className='input-control'>
                            <input
                                type='text'
                                placeholder='Search Name'
                                value={search}
                                onChange={(e) => {
                                    handleChange(e);
                                    handleSuggestions(e.target.value);
                                }}
                            />
                            {searchResults && searchResults.length > 0 && (
                                <ul className='suggestions'>
                                    {searchResults.map((result, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(result)}>
                                            {result}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button type='submit' onSubmit={handleSubmit}>
                                Search
                            </button>
                        </div>
                    </form>
                    <div className='filter-btn-right'>
                        <a className='button-nav' href='/'>
                            Home
                        </a>
                        <a
                            className='button-nav'
                            onClick={() => {
                                setRendered('full_tree');
                                getTreeData();
                            }}
                        >
                            Load Full Tree
                        </a>
                        <a className='button-nav' onClick={() => setRendered('about_me')}>
                            About me
                        </a>
                    </div>
                </div>
            </header>
            {switchComponent()}
        </HomepageStyled>
    );
}


const HomepageStyled = styled.div`
  background-color: #ededed;

  header {
    padding: 2rem 5rem;
    width: 100%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;

    @media screen and (max-width: 1530px) {
      width: 100%;
    }

    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      flex-grow: 1;
      justify-content: center;

      .filter-btn-right {
        margin-left: auto;
        font-size: 1.2rem;
        .button-nav {
          padding: 1rem;
        }
      }

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-right: auto;
        font-size: 3.2rem;
      }

      .input-control {
        position: relative;
        transition: all 0.4s ease-in-out;
        flex-grow: 1;
        display: flex;
        align-items: center;

        input[type="text"] {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
        }

        .suggestions {
          position: absolute;
          z-index: 999;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          width: 100%;
          top: 60px;
          left: 0;
          max-height: 300px;
          overflow-y: auto;
        }

        .suggestion-item {
          padding: 0.7rem 1rem;
          cursor: pointer;

          &:hover {
            background-color: #e5e7eb;
          }
        }

        button[type="submit"] {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.5rem;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          cursor: pointer;
          transition: all 0.4s ease-in-out;
          font-family: inherit;
          border: 5px solid #e5e7eb;
        }
      }

      form {
        position: relative;
        width: 30%;
        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }

        button[type="submit"] {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`;



export default Homepage