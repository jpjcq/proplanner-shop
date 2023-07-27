import { useEffect, useState } from "react";
import {
  StyledTabContent,
  StyledTabList,
  StyledTabRoot,
  StyledTabTrigger,
} from "../Tabs";
import RendezVousContent from "./RendezVousContent";
import UserDetailsContent from "./UserDetailsContent";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useLocation } from "react-router-dom";

export default function ProfileModule() {
  const [activeTab, setActiveTab] = useState<"rendez-vous" | "profile">(
    "rendez-vous"
  );

  // Profile tab states
  const [userState, setUserState] = useState<User>();
  const [docPhone, setDocPhone] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [last, setLast] = useState("");
  const [first, setFirst] = useState("");

  // Automatic tab
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setActiveTab(params.get("tab") as "rendez-vous" | "profile");
  }, [setActiveTab, location.search]);

  // Get user doc from firestore
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        void (async function () {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserState(user);
            setDocPhone(docSnap.data().phone as string);
            setPhone(docSnap.data().phone as string);
            setEmail(docSnap.data().email as string);
            setLast(docSnap.data().last as string);
            setFirst(docSnap.data().first as string);
          }
        })();
      }
    });
  }, []);

  return (
    <StyledTabRoot
      defaultValue="rendez-vous"
      value={activeTab}
      onValueChange={(value) =>
        setActiveTab(value as "rendez-vous" | "profile")
      }
    >
      <StyledTabList $isProfile>
        <StyledTabTrigger value="rendez-vous" $isProfile>
          Mes rendez-vous
        </StyledTabTrigger>
        <StyledTabTrigger value="profile" $isProfile>
          Mes coordonnées
        </StyledTabTrigger>
      </StyledTabList>
      <StyledTabContent asChild value="rendez-vous">
        <RendezVousContent />
      </StyledTabContent>
      <StyledTabContent value="profile">
        <UserDetailsContent
          userState={userState!}
          docPhone={docPhone}
          phone={phone}
          email={email}
          last={last}
          first={first}
          setUserState={setUserState}
          setDocPhone={setDocPhone}
          setPhone={setPhone}
          setEmail={setEmail}
          setLast={setLast}
          setFirst={setFirst}
        />
      </StyledTabContent>
    </StyledTabRoot>
  );
}
