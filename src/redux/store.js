import { configureStore, combineReducers } from "@reduxjs/toolkit";
import countryReducer from "./countryRedux";


const rootReducer = combineReducers({country:countryReducer})

export const store = configureStore({
    reducer:rootReducer
});
