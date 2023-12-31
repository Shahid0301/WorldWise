import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = `http://localhost:8000`;
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error while loading");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
    async  function getCity(id) {
        try {
            console.log(id);
              setIsLoading(true);
              const res = await fetch(`${BASE_URL}/cities/${id}`);
              const data = await res.json();
              setCurrentCity(data);
            } catch {
              alert("there was an error while loading");
            } finally {
              setIsLoading(false);
            }
          }
    
    return (
        <CitiesContext.Provider value={
            {
                cities,
                isLoading,
                currentCity,
                getCity,
            }
        }>
            {children}
        </CitiesContext.Provider>
    )
}
function useCities() {
    const context = useContext(CitiesContext);
    if(context===undefined) throw new Error("Cities Context was used outside the citiesProvider")
    return context;
}
export { CitiesProvider,useCities };