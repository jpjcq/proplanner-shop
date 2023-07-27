import { useState, useContext } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import CartContext from "../../../contexts/cart/cart-context";
import {
  User as UserIcon,
  ShoppingCart,
  UserCheck as UserCheckIcon,
  ChevronLeft,
} from "react-feather";
import TextLogo from "./TextLogo";
import { QuantityIcon } from "../CartModal/QuantityIcon";
import { CartModal } from "../CartModal";
import Menu from "../../Menu";
import UserContext from "../../../contexts/user/user-context";

const Link = styled(ReactRouterLink)`
  color: ${({ theme }) => theme.textPrimary};
`;

const Header = styled.header`
  position: fixed;
  backdrop-filter: blur(10px);
  width: 100%;
  z-index: 10;
`;

const Nav = styled.nav`
  width: 100%;
  margin: 15px 0;
`;

const Ul = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Li = styled.li`
  height: 25px;
  width: 25px;
`;

export function ShopWelcomeNavbar() {
  return (
    <Header>
      <Nav>
        <Ul>
          <Li>
            <Link to="/shop">
              <ChevronLeft />
            </Link>
          </Li>
          <TextLogo />
          <Li></Li>
        </Ul>
      </Nav>
    </Header>
  );
}

export function ShopNavbar() {
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const [chooseServiceFirst, setChooseServiceFirst] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const switchToDatePicker = () => {
    if (cartCtx.cartItems.length > 0) {
      setChooseServiceFirst(false);
      navigate("/shop/date");
    } else {
      setChooseServiceFirst(true);
    }
  };

  const switchToServicePicker = () => {
    setChooseServiceFirst(false);
    navigate("/shop/service");
  };

  return (
    <>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Header>
        <Nav>
          <Ul>
            <Li>
              {userCtx.isConnected ? (
                <UserCheckIcon onClick={() => setIsMenuOpen(true)} />
              ) : (
                <UserIcon onClick={() => setIsMenuOpen(true)} />
              )}
            </Li>
            <TextLogo />
            <Li>
              <CartModal
                switchToServicePicker={switchToServicePicker}
                switchToDatePicker={switchToDatePicker}
                chooseServiceFirst={chooseServiceFirst}
              >
                <div style={{ position: "relative", height: "30px" }}>
                  <ShoppingCart style={{ position: "absolute" }} />
                  {cartCtx.cartItems.length > 0 && <QuantityIcon />}
                </div>
              </CartModal>
            </Li>
          </Ul>
        </Nav>
      </Header>
    </>
  );
}

export function ProfileNavbar() {
  const cartCtx = useContext(CartContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const [chooseServiceFirst, setChooseServiceFirst] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const switchToDatePicker = () => {
    if (cartCtx.cartItems.length > 0) {
      setChooseServiceFirst(false);
      navigate("/shop/date");
    } else {
      setChooseServiceFirst(true);
    }
  };

  const switchToServicePicker = () => {
    setChooseServiceFirst(false);
    navigate("/shop/service");
  };

  return (
    <>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Header
        style={{
          position: "static",
          borderBottom: `1px solid ${theme.lightBorder}`,
        }}
      >
        <Nav>
          <Ul>
            <Li>
              <Link to="/shop">
                <ChevronLeft />
              </Link>
            </Li>
            <TextLogo />
            <Li>
              <CartModal
                switchToServicePicker={switchToServicePicker}
                switchToDatePicker={switchToDatePicker}
                chooseServiceFirst={chooseServiceFirst}
              >
                <div style={{ position: "relative", height: "30px" }}>
                  <ShoppingCart style={{ position: "absolute" }} />
                  {cartCtx.cartItems.length > 0 && <QuantityIcon />}
                </div>
              </CartModal>
            </Li>
          </Ul>
        </Nav>
      </Header>
    </>
  );
}
