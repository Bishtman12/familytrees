import React, { createContext, useContext, useReducer } from "react";
import initialTreeData from "../Data.json"

const GlobalContext = createContext();

//actions
const LOADING = "LOADING";
const GET_TREE_DATA = "GET_TREE_DATA";
const GET_SEARCH_TREE_DATA = "GET_SEARCH_TREE_DATA";
const GET_SEARCH_SUGGESTIONS = "GET_SEARCH_SUGGESTIONS";



//reducer
const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case GET_TREE_DATA:
            return { ...state, treeData: action.payload, loading: false }
        case GET_SEARCH_TREE_DATA:
            return { ...state, searchTreeData: action.payload, loading: false }
        case GET_SEARCH_SUGGESTIONS:
            return { ...state, searchResults: action.payload, loading: false }
        default:
            return state;
    }
}

export const GlobalContextProvider = ({ children }) => {

    //intial state
    const intialState = {
        treeData: initialTreeData,
        searchResults: [],
        searchTreeData: [],
        isSearch: false,
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, intialState);

    const [search, setSearch] = React.useState('');

    //initial render
    React.useEffect(() => { getTreeData() }, [])


    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            // update isSearch state using setState
            setState(prevState => ({ ...prevState, isSearch: false }));
        } else {
            // update isSearch state using setState
            setState(prevState => ({ ...prevState, isSearch: true }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            getSearchTreeData(search);
            // update isSearch state using setState
            setState(prevState => ({ ...prevState, isSearch: true }));
        } else {
            // update isSearch state using setState
            setState(prevState => ({ ...prevState, isSearch: false }));
            alert('Please enter a search term')
        }
    };

    // get default tree data
    const getTreeData = async () => {

        dispatch({ type: GET_TREE_DATA })
        dispatch({ type: GET_TREE_DATA, payload: initialTreeData })
    }

    // get the name specific tree
    const getSearchTreeData = async (searchName) => {
        dispatch({ type: GET_SEARCH_TREE_DATA })
        try {
            const response = await fetch(`http://13.233.123.158:8000/v1/tree/${searchName}`);
            const data = await response.json();
            dispatch({ type: GET_SEARCH_TREE_DATA, payload: data })
        }
        catch {
            dispatch({ type: GET_SEARCH_TREE_DATA, payload: initialTreeData })
        }
    }

    // get search name array
    const handleSuggestions = async (value) => {
        dispatch({ type: GET_SEARCH_SUGGESTIONS })
        try {
            const response = await fetch(`http://127.0.0.1:8000/v1/${value}/suggest`);
            const data = await response.json();
            dispatch({ type: GET_SEARCH_SUGGESTIONS, payload: data })
        }
        catch {
            // get the whole array or empty array of names
            dispatch({ type: GET_SEARCH_SUGGESTIONS, payload: initialTreeData })
        }
    };

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleSuggestions,
            getSearchTreeData,
            getTreeData,
            handleChange,
            handleSubmit

        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(GlobalContext);
}