import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServerContext from "../../Features/ServerContext";
import axios from "axios";
import "./show.css";

const RecipePage = () => {
  const { serverURL } = useContext(ServerContext);
  const { recipe_id } = useParams();

  const [recipe_data, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveRecipe = async () => {
      setLoading(true);
      const res = await axios.get(`${serverURL}/recipes/show/${recipe_id}`);
      setRecipe(res.data);
      setLoading(false);
    };
    retrieveRecipe();
  }, []);

  return (
    <div key={recipe_data.recipe_id}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>{" "}
      <div>
        <h4>Recipe</h4>
        <h1>{recipe_data.title}</h1>
      </div>
      <div>
        <img src={recipe_data.img} alt={recipe_data.name} />
      </div>
      <div>
        <h2>{recipe_data.description}</h2>
      </div>
      <div>
        <p>{recipe_data.recipe_content}</p>
      </div>
      <div>
        <p>
          {" "}
          Preparation Time:
          {recipe_data.prep_time_in_minutes}, Cook Time:{" "}
          {recipe_data.cook_time_in_minutes}, Total time:{" "}
          {recipe_data.total_time_in_minutes},
        </p>
        <div>
          <p>
            Servings:
            {recipe_data.servings}
          </p>
          <div>
            <a
              className="editBtn"
              href={`/editRecipe/:recipe_id${recipe_data.recipe_id}`}
            >
              Edit
            </a>
          </div>
          <div>
            <form
              method="POST"
              action={`/recipe/${recipe_data.recipe_id}?_method=DELETE`}
            >
              <input
                type="submit"
                className="btn btn-danger"
                value="Delete Recipe"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
