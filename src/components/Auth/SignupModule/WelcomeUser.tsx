import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { SmallHeadline } from "../../../theme/text";

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin-bottom: 20px;
`;

const StyledSmallHeadline = styled(SmallHeadline)`
  font-family: "Sacramento";
`;

export default function WelcomeUser({ first }: { first: string }) {
  const navigate = useNavigate();

  setTimeout(function () {
    navigate("/shop/service");
  }, 4000);

  return (
    <WelcomeWrapper>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <StyledSmallHeadline fontSize={60}>Bienvenue</StyledSmallHeadline>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.7,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <SmallHeadline>{first}</SmallHeadline>
      </motion.div>
    </WelcomeWrapper>
  );
}
