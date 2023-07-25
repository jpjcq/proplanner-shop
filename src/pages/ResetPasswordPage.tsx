import ResetPasswordModule from "../components/Auth/ResetPasswordModule";
import { ShopWelcomeNavbar } from "../components/Shop/Navbar";
import FixedCenteringWrapper from "../components/utils/FixedCenteringWrapper";

export default function ResetPasswordPage() {
  return (
    <>
      <ShopWelcomeNavbar />
      <FixedCenteringWrapper>
        <ResetPasswordModule />
      </FixedCenteringWrapper>
    </>
  );
}
