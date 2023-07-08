import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./show.css";
import ServerContext from "../../Features/ServerContext";
import AccountContext from "../../Features/AccountContext";
import { RecipeData } from "./RecipeProps";

const RecipePage = () => {
  const { serverURL } = useContext(ServerContext);
  const { user_id } = useContext(AccountContext);
  const { recipe_id } = useParams();
  const navigate = useNavigate();

  const [recipe_data, setRecipe] = useState<RecipeData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const retrieveRecipe = async () => {
      setLoading(true);
      const res = await axios.get(`${serverURL}/recipes/show/${recipe_id}`);
      setRecipe(res.data);
      setLoading(false);
    };
    retrieveRecipe();
  }, []);

  const handleDelete = (e: React.FormEvent) => {

    e.preventDefault();

    fetch(`${serverURL}/recipes/${recipe_id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
          "Content-Type": "application/json",
      },
      credentials: 'include'
    })
      .then((res) => {
        console.log(res)
        navigate('/')
      })
  }

  return (
    recipe_data ? 
    <div key={recipe_data.recipe_id}>
      <div>
        <h1>{recipe_data.title}</h1>
        <h2>By: {recipe_data.author ? recipe_data.author.username : ''}</h2>
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
          <p>
            Tags:
            {recipe_data.tags ? recipe_data.tags.join(', ') : 'Loading'}
          </p>
          {user_id === recipe_data.user_id ? 
            <>
              <div>
                <a className="editBtn" href={`/editRecipe/${recipe_data.recipe_id}`}>Edit</a>
              </div>
              <input
                type="submit"
                value="Delete Recipe"
                onClick={handleDelete} 
                />
              </> : 
              <></>
          }
        </div>
      </div>
    </div>
    : <></>
  );
};

export default RecipePage;