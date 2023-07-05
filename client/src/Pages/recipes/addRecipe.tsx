import React, { FC, useContext, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./addRecipe.css"
import ServerContext from "../../Features/ServerContext";
import { RecipeProps } from "./RecipeProps";

const AddRecipe = () => {

  const title = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();
  const content = useRef<HTMLInputElement>();
  const cookTime = useRef<HTMLInputElement>();
  const prepTime = useRef<HTMLInputElement>();
  const servings = useRef<HTMLInputElement>();
  const tags = useRef<HTMLInputElement>();
  
  const { serverURL } = useContext(ServerContext)
  const navigate = useNavigate();

  const handleAdd = (e: React.FormEvent, recipeInfo: RecipeProps) => {

    e.preventDefault();
    

    fetch(`${serverURL}/recipes`, {
      method: 'POST',
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
    <Form>
      <h2> Add Recipe </h2>
      <InputGroup className="mb-3">
          <label htmlFor='title'>Title: </label>
          <Form.Control
            ref={title as React.RefObject<HTMLInputElement>}
            type="text"
            id="title"
            name="title"
            placeholder="Recipe Name"
          ></Form.Control>
        </InputGroup>
        <div>
        <Form.Control placeholder="Picture" id="pic" name="pic"></Form.Control>
        </div>
        <div>
          <label htmlFor='description'>Description: </label>
          <input
            ref={description as React.RefObject<HTMLInputElement>}
            type="text"
            id="description"
            name="name"
            placeholder="Description"
          />
        </div>
        <div>
          <label htmlFor="content">Recipe: </label>
          <input
          ref={content as React.RefObject<HTMLInputElement>}
            type="text"
            id="content"
            name="content"
            placeholder="Recipe content"
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
          <button type="submit" onClick={(e) => handleAdd(
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
    </Form>
  );
};

export default AddRecipe;
