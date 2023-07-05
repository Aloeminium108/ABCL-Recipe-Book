import React, { useContext, useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ServerContext from "../../Features/ServerContext";
import { RecipeData, RecipeProps } from "./RecipeProps";

const EditRecipe = () => {

  const title = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();
  const content = useRef<HTMLInputElement>();
  const cookTime = useRef<HTMLInputElement>();
  const prepTime = useRef<HTMLInputElement>();
  const servings = useRef<HTMLInputElement>();
  const tags = useRef<HTMLInputElement>();
  
  const { serverURL } = useContext(ServerContext);
  const { recipe_id } = useParams();
  const navigate = useNavigate();

  const [recipe_data, setRecipe] = useState<RecipeData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const retrieveRecipe = async () => {
        setLoading(true);
        const res = await axios.get(`${serverURL}/recipes/show/${recipe_id}`);
        const recipe_info = {
          user_id: res.data.user_id,
          title: res.data.title,
          description: res.data.description,
          recipe_content: res.data.recipe_content,
          prep_time_in_minutes: res.data.prep_time_in_minutes,
          cook_time_in_minutes: res.data.cook_time_in_minutes,
          servings: res.data.servings,
          tags: res.data.tags.join(' '),
        }
        setRecipe(recipe_info);
        setLoading(false);
        title!!.current!!.value = recipe_info.title;
        description!!.current!!.value = recipe_info.description;
        content!!.current!!.value = recipe_info.recipe_content;
        cookTime!!.current!!.value = recipe_info.cook_time_in_minutes;
        prepTime!!.current!!.value = recipe_info.prep_time_in_minutes;
        servings!!.current!!.value = recipe_info.servings;
        tags!!.current!!.value = recipe_info.tags;
      };
      retrieveRecipe();
  }, []);

  const handleEdit = (e: React.FormEvent, recipeInfo: RecipeProps) => {

    e.preventDefault();

    fetch(`${serverURL}/recipes/${recipe_id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
          "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(recipeInfo),
    })
      .then((res) => {
          console.log(res)
          navigate('/')
      })
  }

  return (
    <div>
      <h2> Edit Recipe </h2>
      <form>
        <div>
          <label htmlFor='title'>Title: </label>
          <input
            ref={title as React.RefObject<HTMLInputElement>}
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div>
          <input placeholder="Picture" id="pic" name="pic" />
        </div>
        <div>
          <label htmlFor='description'>Description: </label>
          <input
            ref={description as React.RefObject<HTMLInputElement>}
            type="text"
            id="description"
            name="name"
          />
        </div>
        <div>
          <label htmlFor="content">Recipe: </label>
          <input
          ref={content as React.RefObject<HTMLInputElement>}
            type="text"
            id="content"
            name="content"
          />
        </div>
        <div>
          <label htmlFor="prep-time">Prep Time: </label>
          <input
            ref={prepTime as React.RefObject<HTMLInputElement>}
            type="number"
            id="prep-time"
            name="prep-time"
          />

          <label htmlFor="cook-time">Cook Time: </label>
          <input
            ref={cookTime as React.RefObject<HTMLInputElement>}
            type="number"
            id="cook-time"
            name="cook-time"
          />

        </div>
        <div>
          <label htmlFor="servings">Servings: </label>
          <input
            ref={servings as React.RefObject<HTMLInputElement>}
            type="number"
            id="servings"
            name="servings"
          />
        </div>
        <div>
          <label htmlFor="tags">Tags: </label>
          <input 
            ref={tags as React.RefObject<HTMLInputElement>}
            type="text"
            id="tags"
            name="tags"
          />
        </div>
        
        <div>
          <button type="submit" onClick={(e) => handleEdit(
            e, {
              title: title!!.current!!.value,
              description: description!!.current!!.value,
              content: content!!.current!!.value,
              cookTime: parseInt(cookTime!!.current!!.value),
              prepTime: parseInt(prepTime!!.current!!.value),
              servings: parseInt(servings!!.current!!.value),
              tags: tags!!.current!!.value
            }
          )}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe