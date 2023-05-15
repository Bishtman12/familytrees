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
            return { ...state, treeData: action.payload.result, loading: false }
        case GET_SEARCH_SUGGESTIONS:
            return { ...state, searchResults: action.payload, loading: false }
        default:
            return initialTreeData;
    }
}

export const GlobalContextProvider = ({ children }) => {

    //intial state
    const intialState = {
        treeData: {},
        searchResults: [],
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
            state.isSearch = false;
        }
    }

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            getSearchTreeData(search);
            state.isSearch = true;
        }
        else {
            state.isSearch = false;
        }
    }

    // get default tree data
    const getTreeData = async () => {
        dispatch({ type: GET_TREE_DATA })
    }

    // get the name specific tree
    const getSearchTreeData = async (searchName) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/v1/tree/?name=${searchName}`);
            const data = await response.json();
            console.log(data)
            dispatch({ type: GET_SEARCH_TREE_DATA, payload: data })
        }
        catch {
            dispatch({ type: GET_SEARCH_TREE_DATA, payload: initialTreeData })
        }
    }

    // get search name array
    const handleSuggestions = async (value) => {
        if (!value) { dispatch({ type: GET_SEARCH_SUGGESTIONS, payload: [] }) }
        try {
            const response = await fetch(`http://127.0.0.1:8000/v1/${value}/suggest`);
            const data = await response.json();
            dispatch({ type: GET_SEARCH_SUGGESTIONS, payload: data?.result.slice(0,5) ?? [] })
        }
        catch {
            // get the whole array or empty array of names
            dispatch({ type: GET_SEARCH_SUGGESTIONS, payload: [] })
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