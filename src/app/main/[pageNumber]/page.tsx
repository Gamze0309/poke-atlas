"use client";
import "../../css/main.css";
import PokemonsList from "../../components/PokemonsList";
import withLayout from "@/app/components/withLayout";

const WithNumberMainPage = () => {
  return <PokemonsList />;
};

export default withLayout(WithNumberMainPage);
