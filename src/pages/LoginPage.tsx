import { ShopWelcomeNavbar } from "../components/Shop/Navbar";
import FixedCenteringWrapper from "../components/utils/FixedCenteringWrapper";
import LoginModule from "../components/Auth/LoginModule";

export default function LoginPage() {
  return (
    <>
      <ShopWelcomeNavbar />
      <FixedCenteringWrapper>
        <LoginModule />
      </FixedCenteringWrapper>
    </>
  );
}
