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
        searchResults: {},
        isSearch: false,
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, intialState);

    const [search, setSearch] = React.useState('');

    //initial render
    React.useEffect(() => { getTreeData() }, [])


    const handleChange = (e) => {
        console.log(e)
        setSearch(e.target.value);
        console.log("search --> ", search, e.target.value)
        handleSuggestions(e.target.value)
        if (e.target.value === '') {
            state.isSearch = false;
        }
    }

    //handle submit
    const handleSubmit = (e) => {
        console.log("HS",e)
        if (e) {
            getSearchTreeData(e);
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
            console.log("search:", searchName?.value)
            const response = await fetch(`http://127.0.0.1:8000/v1/tree/?name=${searchName?.value}`);
            const data = await response.json();

            dispatch({ type: GET_SEARCH_TREE_DATA, payload: data })
        }
        catch {
            dispatch({ type: GET_SEARCH_TREE_DATA, payload: initialTreeData })
        }
    }

    // get search name array
    const handleSuggestions = async (value) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/v1/suggest?name=${value}`);
            const data = await response.json();

            const options = data?.result.map((name) => ({
                value: name,
                label: name,
            })) ?? [];

            console.log(options)
            dispatch({ type: GET_SEARCH_SUGGESTIONS, payload: { options } });

            return {options}

        } catch (error) {
            console.error(error);
            dispatch({ type: GET_SEARCH_SUGGESTIONS, payload: {} });
        }
    };


    const handleSelection = (selectedOption) => {
        console.log("SELECT")
        setSearch(selectedOption);
        handleSubmit(selectedOption);
    };

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleSuggestions,
            getSearchTreeData,
            getTreeData,
            handleChange,
            handleSubmit,
            handleSelection
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(GlobalContext);
}