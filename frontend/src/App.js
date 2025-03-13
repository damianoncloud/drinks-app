import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DrinkCard from "./components/DrinkCard";
import { Grid } from "@mui/system";
import { TextField } from "@mui/material";

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [userInput, setUserInput] = useState("margherita");

  useEffect(() => {
    if (userInput !== "") {
      axios
        .get(`http://127.0.0.1:5000/api/getcocktail/${userInput}`)
        .then((response) => {
          console.log(response.data.drinks);
          setCocktails(response.data.drinks || []);
        })
        .catch((error) => {
          console.error("Error fetching cocktails:", error);
        });
    } else {
      setCocktails([]);
    }
  }, [userInput]);

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="App">
      <h3>Drinks App</h3>
      <TextField
        sx={{ width: 300, marginBottom: 4 }}
        onChange={handleInput}
        placeholder="Search cocktail by name"
      ></TextField>
      <Grid
        container
        sx={{ justifyContent: "center" }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {cocktails && cocktails.length > 0 ? (
          cocktails.map((cocktail) => (
            <DrinkCard key={cocktail.idDrink} cocktail={cocktail} />
          ))
        ) : (
          <p>No cocktails found</p>
        )}
      </Grid>
    </div>
  );
}

export default App;
