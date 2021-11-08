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

const SearchNoDebounce = () => {
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
    
    //WITHOUT ASYNC DEBOUNCE
    const onChangeHandler1 = (text) =>{
      let matches = [];
      if(text.length>0){
        matches=currentCountry.countries.countries.filter(country=>{
          const regex = new RegExp(`${text}`,"gi");
          return country.countryName.match(regex)||country.countryCode.match(regex);
      })
      }
      setSuggestion(matches);
      setText(text);
    };

    const onSuggestHandler1 =(country)=>{
      setText(country.countryName);
      setInfo(country);
      setSuggestion([]);
    }

    const inputClear1 = () =>{
      setText('');
      setSuggestion([]);
    }


    //WITH ASYNC DEBOUNCE

    const onChangeHandler2 = (text) =>{
      let matches = [];
      if(text.length>0){
        matches=currentCountry.countries.countries.filter(country=>{
          const regex = new RegExp(`${text}`,"gi");
          return country.countryName.match(regex)||country.countryCode.match(regex);
      })
      }
      finishedOnchange(matches,text);
    };

    const finishedOnchange = debounce(500,(matches,text) =>{
      setSuggestion(matches);
      setText(text);
    });
    
      const onSuggestHandler2 =(country)=>{
        setText(country.countryName);
        setInfo(country);
        setSuggestion([]);
      }

      const inputClear2 = () =>{
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
              <SearchInputInitial type="text" onChange={e=>onChangeHandler1(e.target.value)} value={text}/>
              <SearchClear onClick={inputClear1}>
              &#10005;
              </SearchClear>
              </SearchDiv>
              <SearchDiv>
                <SearchResultCont>
                <SearchResultItem >
                  {suggestion.map(country=>{
                    return (
                      <SearchResult key={country.countryCode} onClick={()=>onSuggestHandler1(country)}>
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

export default SearchNoDebounce
