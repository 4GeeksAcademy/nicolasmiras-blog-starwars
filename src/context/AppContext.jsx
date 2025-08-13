import React, { createContext, useReducer, useEffect } from "react";
import { fetchPeople, fetchPlanets, fetchVehicles, fetchDetails } from "../api/swapiService";

const SET_PEOPLE = "SET_PEOPLE";
const SET_PLANETS = "SET_PLANETS";
const SET_VEHICLES = "SET_VEHICLES";
const SET_DETAILS = "SET_DETAILS";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";
const ADD_FAVORITE = "ADD_FAVORITE";
const REMOVE_FAVORITE = "REMOVE_FAVORITE";

const appReducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      if (state.favoritos.some(fav => fav.id === action.payload.id && fav.categoria === action.payload.categoria)) {
        return state;
      }
      return { ...state, favoritos: [...state.favoritos, action.payload] };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favoritos: state.favoritos.filter(fav => !(fav.id === action.payload.id && fav.categoria === action.payload.categoria)),
      };
    case SET_PEOPLE:
      return { ...state, people: action.payload };
    case SET_PLANETS:
      return { ...state, planets: action.payload };
    case SET_VEHICLES:
      return { ...state, vehicles: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_DETAILS: {
      const { categoria, id, detalle } = action.payload;
      return {
        ...state,
        detalles: { ...state.detalles, [`${categoria}-${id}`]: detalle },
      };
    }
    default:
      return state;
  }
};

const STORAGE_KEY = "sw-blog-storage-v3"; // Cambié la clave para forzar reinicio
export const AppContext = createContext();

const initialState = { favoritos: [], people: [], planets: [], vehicles: [], detalles: {}, loading: false, error: null };

export const AppProvider = ({ children }) => {
    const [store, dispatch] = useReducer(appReducer, initialState, () => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            return storedData ? JSON.parse(storedData) : initialState;
        } catch (error) {
            return initialState;
        }
    });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [store]);
  
  const loadData = async (fetcher, actionType) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const data = await fetcher();
      dispatch({ type: actionType, payload: data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const loadDetails = async (category, id) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const details = await fetchDetails(category, id);
      if (details) {
        dispatch({ type: SET_DETAILS, payload: { categoria: category, id, detalle: details.properties } });
      }
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  return (
    <AppContext.Provider
      value={{
        store,
        actions: {
          addFavorite: (item) => dispatch({ type: ADD_FAVORITE, payload: item }),
          removeFavorite: (item) => dispatch({ type: REMOVE_FAVORITE, payload: item }),
          loadPeople: () => loadData(fetchPeople, SET_PEOPLE),
          loadPlanets: () => loadData(fetchPlanets, SET_PLANETS),
          loadVehicles: () => loadData(fetchVehicles, SET_VEHICLES),
          loadDetails: loadDetails,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};