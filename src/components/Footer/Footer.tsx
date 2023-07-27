import styled from "styled-components";
import Box from "../utils/Box";
import { Facebook, Instagram } from "react-feather";

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 75%;
  border-top: 1px solid ${({theme}) => theme.lightBorder};
  padding: .8rem;
  bottom: 0;
`;

export default function Footer() {
  return (
    <Box style={{margin: "5rem 0 .3rem 0"}}>
      <FooterWrapper>
        <Facebook/>
        <Instagram/>
      </FooterWrapper>
    </Box>
  );
}
