
import { countryStart,currentCountry,countryFailure} from "./countryRedux";
import axios from 'axios';



export const getCountry = async(dispatch) =>{
    dispatch(countryStart());
    try{
        const response = await axios.get('http://localhost:5000/api/country/');
        const result = response.data;
        dispatch(currentCountry(result));
    }catch(err){
        dispatch(countryFailure(err));
    }
}

