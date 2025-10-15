"use client";
import "../../css/main.css";
import PokemonsList from "../../components/PokemonsList";
import Header from "@/app/components/Header";

const WithNumberMainPage = () => {
  return (
    <>
      <Header />
      <PokemonsList />
    </>
  );
};

export default WithNumberMainPage;
