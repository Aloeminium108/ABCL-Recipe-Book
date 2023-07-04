import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import '../Pages/recipes/show.css'
import ServerContext from "../Features/ServerContext";
import ShowRecipe from "./recipes/showRecipe";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { serverURL } = useContext(ServerContext);

  useEffect(() => {
    const retrieveRecipes = async () => {
      setLoading(true);
      const res = await axios.get(`${serverURL}/recipes`);
      setRecipes(res.data);
      setLoading(false);
    };
    retrieveRecipes();
  }, []);

  return (
    <div>
      {loading ? "Loading" : ""}
      {recipes.map((recipe) => ShowRecipe(recipe))}

    </div>
  );
}
