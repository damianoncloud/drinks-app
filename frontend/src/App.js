import "./App.css";
import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import DrinkCardFront from "./components/DrinkCardFront";
import { Grid } from "@mui/system";
import FlippingCard from "./components/FlippingCard";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [userInput, setUserInput] = useState("margarita");
  const [open, setOpen] = React.useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      {/* <FlippingCard /> */}
      <Grid
        container
        sx={{ justifyContent: "center" }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {cocktails && cocktails.length > 0 ? (
          cocktails.map((cocktail) => (
            <FlippingCard
              key={cocktail.idDrink}
              cocktail={cocktail}
              handleClickOpen={handleClickOpen}
              setQrCodeUrl={setQrCodeUrl}
            />
          ))
        ) : (
          <p>No cocktails found</p>
        )}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>QR Code:</DialogTitle>
        <img src={qrCodeUrl} alt="QR Code" />
        <DialogContent>
          <DialogContentText>Show this QRCode to the counter</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
