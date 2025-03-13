import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DrinkCard from "./components/DrinkCard";
import { Grid } from "@mui/system";

function App() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/getmargherita").then((response) => {
      console.log(response.data.drinks);
      setCocktails(response.data.drinks);
    });
  }, []);

  return (
    <div className="App">
      <h3>Drinks App</h3>
      <Grid
        container
        sx={{ justifyContent: "center" }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {cocktails.length > 0 ? (
          cocktails.map((cocktail) => (
            <DrinkCard key={cocktail.idDrink} cocktail={cocktail} />
          ))
        ) : (
          <p>No cocktails found</p>
        )}
      </Grid>{" "}
    </div>
  );
}

export default App;
