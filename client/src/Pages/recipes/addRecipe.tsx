import React, { useContext, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./addRecipe.css"
import ServerContext from "../../Features/ServerContext";


const AddRecipe = (props: any) => {

  const title = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();
  const content = useRef<HTMLInputElement>();
  const cookTime = useRef<HTMLInputElement>();
  const prepTime = useRef<HTMLInputElement>();
  const servings = useRef<HTMLInputElement>();
  const tags = useRef<HTMLInputElement>();
  
  const { serverURL } = useContext(ServerContext)
  const navigate = useNavigate();

  const handleAdd = (e: any, recipeInfo: any) => {

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
            ref={title as any}
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
            ref={description as any}
            type="text"
            id="description"
            name="name"
            placeholder="Description"
          />
        </div>
        <div>
          <label htmlFor="content">Recipe: </label>
          <input
          ref={content as any}
            type="text"
            id="content"
            name="content"
            placeholder="Recipe content"
          />
        </div>
        <div>
          <label htmlFor="prep-time">Prep Time: </label>
          <input
            ref={prepTime as any}
            type="number"
            id="prep-time"
            name="prep-time"
          />

          <label htmlFor="cook-time">Cook Time: </label>
          <input
            ref={cookTime as any}
            type="number"
            id="cook-time"
            name="cook-time"
          />

        </div>
        <div>
          <label htmlFor="servings">Servings: </label>
          <input
            ref={servings as any}
            type="number"
            id="servings"
            name="servings"
          />
        </div>
        <div>
          <label htmlFor="tags">Tags: </label>
          <input 
            ref={tags as any}
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
              cookTime: cookTime!!.current!!.value,
              prepTime: prepTime!!.current!!.value,
              servings: servings!!.current!!.value,
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
