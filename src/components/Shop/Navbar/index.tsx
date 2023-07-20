import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../../../contexts/cart/cart-context";
import { User, ShoppingCart } from "react-feather";
import TextLogo from "./TextLogo";
import { QuantityIcon } from "../CartModal/QuantityIcon";
import { CartModal } from "../CartModal";
import Menu from "../../Menu";

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

const WelcomeNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
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
      <WelcomeNav>
        <TextLogo />
      </WelcomeNav>
    </Header>
  );
}

export function ShopNavbar() {
  const [chooseServiceFirst, setChooseServiceFirst] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

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
            <li>
              <User onClick={() => setIsMenuOpen(true)} />
            </li>
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
