import { ShopWelcomeNavbar } from "../components/Shop/Navbar";
import FixedCenteringWrapper from "../components/utils/FixedCenteringWrapper";
import LoginForm from "../components/Auth/LoginForm";

export default function AuthPage() {
  return (
    <>
      <ShopWelcomeNavbar />
      <FixedCenteringWrapper>
        <LoginForm />
      </FixedCenteringWrapper>
    </>
  );
}
