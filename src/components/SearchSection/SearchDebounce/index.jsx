import React,{useState,useEffect,useCallback} from 'react';
import { getCountry } from '../../../redux/apiCalls';
import { useDispatch,useSelector } from 'react-redux';
import {SearchInputInitial,
  SearchItems,
  SearchDiv,
  SearchResultCont,
  SearchResult,
  SearchResultItem,
  SearchInfo,
  InfoLeft,
  InfoRight,
  InfoTitle,
  InfoDesc,
  InfoLabel,
  InfoDets,
  SearchClear,
  SearchLabels} from './SearchElements';

const SearchDebounce = () => {
    const dispatch = useDispatch();
  const {isFetching, error,currentCountry} = useSelector((state)=>state.country);
    //THIS IS FOR THE STATES
     
    const [text,setText] = useState('');
    const [suggestion,setSuggestion] = useState([]);
    const [info,setInfo]=useState([]);

    
    const debounce = (delay, fn) => {
      let inDebounce = null;
      return args => {
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => fn(args), delay);
      }
    }

    useEffect(()=>{
      const loadUsers = async(req,res) =>{
        try{
          getCountry(dispatch)
        }catch(err){
        }
      }
      loadUsers();
      },[]);
    
    //WITH ASYNC DEBOUNCE

    const onChangeHandler = (text) =>{
      let matches = [];
      if(text.length>0){
        matches=currentCountry.countries.countries.filter(country=>{
          const regex = new RegExp(`${text}`,"gi");
          return country.countryName.match(regex)||country.countryCode.match(regex);
      })
      }
      setText(text);
      finishedOnchange(matches);
    };

    const finishedOnchange = debounce(500,(matches,text) =>{
      setSuggestion(matches);
      
    });
    
      const onSuggestHandler =(country)=>{
        setText(country.countryName);
        setInfo(country);
        setSuggestion([]);
      }

      const inputClear = () =>{
        setText('');
        setSuggestion([]);
      }
    
    return (
        <SearchItems>
              <SearchInfo>
                  <InfoLeft>
                    <InfoTitle>
                      {info.countryName}
                    </InfoTitle>
                    <InfoDesc>
                    <InfoLabel>
                      CODE:
                    </InfoLabel>
                    <InfoDets>
                      {info.countryCode}
                    </InfoDets>
                    </InfoDesc>
                  </InfoLeft>
                  <InfoRight>
                    <InfoDesc>
                    
                    <InfoLabel>
                      CURRENCY:
                    </InfoLabel>
                    <InfoDets>
                    {info?info.currencyCode:``}
                    </InfoDets>
                    </InfoDesc>
                    <InfoDesc>
                    
                    <InfoLabel>
                      POPULATION:
                    </InfoLabel>
                    <InfoDets>
                    {info?info.population:``}
                    </InfoDets>
                    </InfoDesc>
                    <InfoDesc>
                      
                      <InfoLabel>
                      CAPITAL:
                    </InfoLabel>
                    <InfoDets>
                    {info?info.capital:``}
                    </InfoDets>
                    </InfoDesc>

                  </InfoRight>
              </SearchInfo>
              <SearchDiv>
              <SearchLabels>
                INPUT COUNTRY NAME
              </SearchLabels>
              <SearchInputInitial type="text" onChange={e=>onChangeHandler(e.target.value)} value={text}/>
              <SearchClear onClick={inputClear}>
              &#10005;
              </SearchClear>
              </SearchDiv>
              <SearchDiv>
                <SearchResultCont>
                <SearchResultItem >
                  {suggestion.map(country=>{
                    return (
                      <SearchResult key={country.countryCode} onClick={()=>onSuggestHandler(country)}>
                        {country.countryName}
                      </SearchResult>
                    )
                  })}
                  </SearchResultItem>
                </SearchResultCont>
              </SearchDiv>
            </SearchItems>
    )
}

export default SearchDebounce
