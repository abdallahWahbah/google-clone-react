import React, {useState, createContext, useContext} from "react";

const ResultContext = createContext();
const baseUrl = `https://google-search3.p.rapidapi.com/api/v1`;

export const ResultContextProvider = ({children}) =>
{
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("Elon");

    // /vidoes, /images, /search
    const getResults = async (type) =>
    {
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${type}`,{
            method:"GET",
            headers: {
                'x-user-agent': 'desktop',
                'x-proxy-location': 'EU',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': '394334c6a5mshf41a9a7a42290dbp1a5126jsnaf94a6d526ab'
            }
        })
        const data = await response.json();
        console.log(data);

        if(type.includes("/news"))
        {
            setResults(data.entries); // the api has an end point called entries(which is a built-in func), that is why we don't setResults directly like below
        }
        else if(type.includes("/images"))
        {
            setResults(data.image_results);
        }
        else
        {
            setResults(data.results);
        }

        // setResults(data);
        setIsLoading(false);
    }

    return(
        <ResultContext.Provider value={{getResults, results, isLoading, setSearchTerm, searchTerm}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);