import styled from 'styled-components';
import { mobile } from "../../responsive";

export const SearchContainer = styled.section`
width:100%;
height:100vh;
display:flex;
align-items: flex-start;
justify-content: space-evenly;
padding:40px 40px;
${mobile(
        {
            
            display:"flex",
            flexWrap:"wrap",
            padding:"10px 10px",
            height:"150vh"
            
        }
        )}
`;

