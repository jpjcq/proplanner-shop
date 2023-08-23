import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CartContext from "../../../contexts/cart/cart-context";
import SelectionScreen from "../SelectionScreen";
import Detail from "./Detail";
import { ServiceChosen, ServiceToPay } from "./ServiceChosen";
import { styled } from "styled-components";
import { BodySmall, SmallSubHeader, SubHeader } from "../../../theme/text";
import { AnimatedShopButtonPrimary } from "../../Button";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, payments } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserDoc } from "../../../types/userDoc";
import { formatPhoneNumber } from "react-phone-number-input";
import CheckIcon from "../../Checkbox/CheckIcon";
import {
  StyledCheckboxIndicator,
  StyledCheckboxLabel,
  StyledCheckboxRoot,
} from "../../Checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { getProducts } from "@stripe/firestore-stripe-payments";

const Separator = styled.div`
  height: 2px;
  width: 50%;
  align-self: center;
  border-bottom: 1px solid ${({ theme }) => theme.lightBorder};
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled(SmallSubHeader)`
  margin-bottom: 10px !important;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SignUpButton = styled(Link)`
  all: unset;
  margin-top: 10px;
  width: 45%;
  text-align: center;
  color: ${({ theme }) => theme.accent};
  background-color: transparent;
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.accent};
  padding: 15px 23px;
  border-radius: 4px;
`;

const ConnectButton = styled(Link)`
  all: unset;
  margin-top: 10px;
  width: 45%;
  text-align: center;
  color: white;
  font-weight: 600;
  background-color: ${({ theme }) => theme.accent};
  border: 2px solid ${({ theme }) => theme.accent};
  padding: 15px 23px;
  border-radius: 4px;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  &:first-child {
    margin-bottom: 20px;
  }
`;

export default function SummaryAndPayment() {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const [userState, setUserState] = useState<UserDoc | null>(null);

  const [isPartialPayment, setIsPartialpayment] = useState<CheckedState>(true);
  const [isFullPayment, setIsFullpayment] = useState<CheckedState>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        void (async function () {
          try {
            const userRef = doc(db, "customers", user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
              sessionStorage.setItem("isConnected", "true");
              setUserState(docSnap.data() as UserDoc);
            }
          } catch (e) {
            console.log(e);
          }
        })();
      }
      if (!user) {
        sessionStorage.setItem("isConnected", "false");
      }
    });
    return () => unsubscribe();
  });

  const ServiceChosenList = cartCtx.cartItems.flatMap(
    (itemInCart, index, array) => {
      return (
        <>
          {Array.from({ length: itemInCart.quantity }).map(
            (_, index, array) => (
              <>
                <ServiceChosen
                  key={index}
                  id={itemInCart._id}
                  title={itemInCart.title}
                  price={itemInCart.price}
                  duration={itemInCart.duration}
                />
                {index < array.length - 1 ? <Separator /> : null}
              </>
            )
          )}
          {index < array.length - 1 ? <Separator /> : null}
        </>
      );
    }
  );

  const ServiceToPayList = cartCtx.cartItems.flatMap(
    (itemInCart, index, array) => {
      return (
        <>
          {Array.from({ length: itemInCart.quantity }).map(
            (_, index, array) => (
              <>
                <ServiceToPay
                  key={index}
                  title={itemInCart.title}
                  price={itemInCart.price}
                />
                {index < array.length - 1 ? <Separator /> : null}
              </>
            )
          )}
          {index < array.length - 1 ? <Separator /> : null}
        </>
      );
    }
  );

  if (cartCtx.isEmpty) {
    return <Navigate to="/shop/service" />;
  } else {
    return (
      <>
        <SelectionScreen activePicker="summary" />
        <Detail title="Préstations choisies">{ServiceChosenList}</Detail>
        <Detail title="Date et heure choisies">
          <Row>
            <Column>
              <Title>
                {cartCtx.chosenDate?.start?.setLocale("fr").toLocaleString({
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Title>
              <BodySmall>
                {cartCtx.chosenDate?.start
                  ?.setLocale("fr")
                  .toLocaleString({ hour: "numeric", minute: "numeric" })}
              </BodySmall>
            </Column>
            <Column>
              <AnimatedShopButtonPrimary
                onClick={() => {
                  cartCtx.removeDateFromCart();
                  navigate("/shop/date");
                }}
              >
                modifier
              </AnimatedShopButtonPrimary>
            </Column>
          </Row>
        </Detail>
        <Detail title="Mon identité">
          {!userState && (
            <ButtonsWrapper>
              <Title fontSize={16}>Premier rendez-vous ?</Title>
              <SignUpButton to="/auth/signup">S'inscrire</SignUpButton>
              <Separator style={{ width: "90%" }} />
              <Title fontSize={16}>Vous avez déjà prit rendez-vous ?</Title>
              <ConnectButton to="/auth/login">Se connecter</ConnectButton>
            </ButtonsWrapper>
          )}
          {userState && (
            <>
              <Row>
                <Column>
                  <Title>
                    {userState.last}&nbsp;{userState.first}
                  </Title>
                  <BodySmall>{formatPhoneNumber(userState.phone)}</BodySmall>
                </Column>
                <Column>
                  <AnimatedShopButtonPrimary
                    onClick={() => {
                      navigate("/profile?tab=profile");
                    }}
                  >
                    modifier
                  </AnimatedShopButtonPrimary>
                </Column>
              </Row>
            </>
          )}
        </Detail>
        <Detail title="Paiement">
          <CheckboxWrapper>
            <StyledCheckboxRoot
              className="CheckboxRoot"
              id="c1"
              checked={isPartialPayment}
              onCheckedChange={(checked) => {
                if (checked) {
                  setIsFullpayment(false);
                  setIsPartialpayment(true);
                } else {
                  setIsPartialpayment(true);
                }
              }}
            >
              <StyledCheckboxIndicator className="CheckboxIndicator">
                <CheckIcon />
              </StyledCheckboxIndicator>
            </StyledCheckboxRoot>
            <StyledCheckboxLabel className="Label" htmlFor="c1">
              <BodySmall>
                Payer{" "}
                <span style={{ fontWeight: 600 }}>
                  une partie {cartCtx.cartAmount / 4}€ maintenant
                </span>
                , puis le reste {(cartCtx.cartAmount / 4) * 3}€ sur place.
              </BodySmall>
            </StyledCheckboxLabel>
          </CheckboxWrapper>
          <CheckboxWrapper>
            <StyledCheckboxRoot
              className="CheckboxRoot"
              id="c2"
              checked={isFullPayment}
              onCheckedChange={(checked) => {
                if (checked) {
                  setIsPartialpayment(false);
                  setIsFullpayment(true);
                } else {
                  setIsFullpayment(true);
                }
              }}
            >
              <StyledCheckboxIndicator className="CheckboxIndicator">
                <CheckIcon />
              </StyledCheckboxIndicator>
            </StyledCheckboxRoot>
            <StyledCheckboxLabel className="Label" htmlFor="c2">
              <BodySmall>
                Payer{" "}
                <span style={{ fontWeight: 600 }}>
                  la totalité {cartCtx.cartAmount}€ maintenant
                </span>
                .
              </BodySmall>
            </StyledCheckboxLabel>
          </CheckboxWrapper>
          <Separator style={{ width: "80%", margin: "30px 0" }} />
          <Row style={{ marginBottom: "10px" }}>{ServiceToPayList}</Row>
          <Row>
            <SmallSubHeader>Total</SmallSubHeader>
            <SmallSubHeader>{cartCtx.cartAmount}€</SmallSubHeader>
          </Row>
          <Separator style={{ width: "80%", margin: "30px 0" }} />
          <Row style={{ marginBottom: "10px" }}>
            <SmallSubHeader>A régler maintenant</SmallSubHeader>
            <SmallSubHeader>
              {isPartialPayment ? cartCtx.cartAmount / 4 : cartCtx.cartAmount}€
            </SmallSubHeader>
          </Row>
          <Row>
            <BodySmall>A régler sur place</BodySmall>
            <BodySmall>
              {isPartialPayment ? (cartCtx.cartAmount / 4) * 3 : 0}€
            </BodySmall>
          </Row>
          <Separator style={{ width: "80%", margin: "30px 0" }} />
          <SubHeader fontWeight={700}>Annulation</SubHeader>
          <br />
          <BodySmall>
            Vous pouvez annuler gratuitement votre réservation jusqu'au 07
            septembre à 09:00, et être remboursé de la totalité du montant.
            Passé cette date, l'acompte ne sera plus remboursable.
            <br />
            <br /> En cas de non présentation au rendez-vous, l'acompte ne sera
            pas remboursé.
          </BodySmall>
          <Separator style={{ width: "80%", margin: "30px 0" }} />
          <SmallSubHeader>Numéro de carte</SmallSubHeader>

          {/* <PaymentElement /> */}
         
        </Detail>
      </>
    );
  }
}
