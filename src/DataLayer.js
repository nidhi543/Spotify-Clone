import React , {createContext, useContext, useReducer} from 'react';

export const DataLayerContext = createContext();

//prepare datalayer
export const DataLayer = ({initialState, reducer , children}) => (
    <DataLayerContext.Provider value={useReducer(reducer,initialState)}> 
        {children}
    </DataLayerContext.Provider>

); // problem {} -> ()
export const useDataLayerValue = () => useContext(DataLayerContext);