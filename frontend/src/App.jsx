import React, { useEffect, useReducer, useState } from "react";

import Footer from "./components/Footer";
import Content from "./components/Content";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { produits, accueil } from "./data/data";
import styles from "./assets/styles/App.module.scss";
import ProduitFavorisContext from "./contexts/produitFavoris";
import produitFavorisReducers from "./reducers/produitFavorisReducers";

const App = () => {
  const [state, dispatch] = useReducer(produitFavorisReducers, {
    produitsFavoris: [],
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/produits");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Erreur lors de la récupération des produits");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={`${styles.app_container} d-flex flex-column`}>
      <ProduitFavorisContext.Provider
        value={{ data: state.produitsFavoris, ajusterData: dispatch }}
      >
        <Header />
        <Banner />
        <Content produits={produits} accueil={accueil} />
      </ProduitFavorisContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
