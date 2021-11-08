import React from 'react';
import {SearchContainer} from './SearchSectionElements';
import SearchNoDebounce from './SearchNoDebounce';
import SearchDebounce from './SearchDebounce';

const SearchSection = () => {
    return (
        <SearchContainer id='searches'>
            <SearchNoDebounce/>
            <SearchDebounce/>
        </SearchContainer>
    )
}

export default SearchSection
