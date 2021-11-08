import {createSlice} from "@reduxjs/toolkit";

const countrySlice = createSlice({
    name:"country",
    initialState:{
        currentCountry:null,
        isFetching:false,
        error:false
    },
    reducers:{
        countryStart:(state)=>{
            state.isFetching = true;
        },
        currentCountry:(state,action)=>{
            state.isFetching = false;
            state.currentCountry = action.payload;
        },
        countryFailure:(state)=>{
            state.isFetching = false;
            state.error=true;
        },

        suggestCountryStart:(state)=>{
            state.isFetching = true;
        },
        suggestCurrentCountry:(state,action)=>{
            state.isFetching = false;
        },
        suggestCountryFailure:(state)=>{
            state.isFetching = false;
            state.error=true;
        },
    },
});

export const {countryStart,currentCountry,countryFailure} = countrySlice.actions;

export default countrySlice.reducer;