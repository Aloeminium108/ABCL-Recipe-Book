import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";


import './App.css'
import ServerContext from "./Features/ServerContext";
import AccountContext from "./Features/AccountContext";
import React from "react";
import Home from "./Pages/Home";
import AddRecipe from "./Pages/recipes/addRecipe";
import RecipePage from "./Pages/recipes/recipePage";
import ProfilePage from "./Components/ProfilePage";
import LoginSignupPage from "./Components/LoginSignupPage";
import SearchPage from "./Pages/SearchPage";
import EditRecipe from "./Pages/recipes/editRecipe";
import Navbar from "./Components/Navbar";

function App() {

  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [user_id, setUserId] = useState<number | null>(null)
  const [username, setUsername] = useState<string>('')

  return (
    <ServerContext.Provider value={{
      serverURL: process.env.REACT_APP_SERVER_URL
    }}>
      <AccountContext.Provider value={{
        loggedIn, 
        setLoggedIn,
        user_id,
        setUserId,
        username,
        setUsername
      }}>
      <BrowserRouter>
      <Navbar />
        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/addRecipe" element={<AddRecipe />} />

            <Route path="/editRecipe/:recipe_id" element={<EditRecipe />} />

            <Route path="/recipe/:recipe_id" element={<RecipePage />} />

            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/login" element={<LoginSignupPage />} />

            <Route path="/search" element={<SearchPage />} />
            
          </Routes>
        </BrowserRouter>
      </AccountContext.Provider>
    </ServerContext.Provider>
    
  );
}

export default App;
