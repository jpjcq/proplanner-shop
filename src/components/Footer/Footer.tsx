import styled from "styled-components";
import { FacebookIcon, InstagramIcon } from "../../icons/socials";
import Box from "../utils/Box";

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
    <Box margin="5rem 0 .3rem 0">
      <FooterWrapper>
        <FacebookIcon />
        <InstagramIcon />
      </FooterWrapper>
    </Box>
  );
}
