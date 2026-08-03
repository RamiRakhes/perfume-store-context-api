import React, { useContext, useState } from "react";
import logo from "../assets/images/AM-logo.svg";
import styles from "../assets/styles/Header.module.scss";
import User from "./User";
import Logo from "./Logo";
import { users } from "../data/data";
import HeaderUser from "./HeaderUser";
import ProduitFavorisContext from "../contexts/produitFavoris";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConnexion, setShowConnexion] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState(null);
  const produitsFavoris = useContext(ProduitFavorisContext);

  const handleOnChangeEmail = (e) => {
    setEmailInput(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPasswordInput(e.target.value);
  };
  const handleOnClickConnexion = (e) => {
    e.stopPropagation();
    const userFound = users.filter(
      (user) => user.email.toLowerCase() === emailInput.toLowerCase()
    );
    if (userFound.length > 0 && userFound[0].password === passwordInput) {
      setUser(userFound[0]);
      setEmailInput("");
      setPasswordInput("");
      setShowConnexion(false);
    } else setUser(false);
  };
  const handleOnClickDeconnexion = (e) => {
    e.stopPropagation();
    setUser(null);
    produitsFavoris.ajusterData({ type: "RESET" });
  };
  return (
    <div className={`${styles.header} d-flex flex-row align-items-center`}>
      <Logo logo={logo} />
      <User user={user} handleDeconnexion={handleOnClickDeconnexion} />
      <HeaderUser
        setShowMenu={setShowMenu}
        setShowConnexion={setShowConnexion}
        showMenu={showMenu}
        showConnexion={showConnexion}
        handleOnChangeEmail={handleOnChangeEmail}
        handleOnChangePassword={handleOnChangePassword}
        handleOnClickDeconnexion={handleOnClickDeconnexion}
        handleOnClickConnexion={handleOnClickConnexion}
        emailInput={emailInput}
        passwordInput={passwordInput}
        user={user}
      />
    </div>
  );
};

export default Header;
