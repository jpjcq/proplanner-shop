import styled from "styled-components";

const FixedCenteringWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: -15%; */
`;

export default FixedCenteringWrapper;
