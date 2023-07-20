import { ShopWelcomeNavbar } from "../components/Shop/Navbar";
import FixedCenteringWrapper from "../components/utils/FixedCenteringWrapper";
import SignupModule from "../components/Auth/SignupModule";

export default function SignupPage() {
  return (
    <>
      <ShopWelcomeNavbar />
      <FixedCenteringWrapper>
        <SignupModule />
      </FixedCenteringWrapper>
    </>
  );
}
