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
import Sidebar from "./components/Sidebar";
import Header, {
  SearchIconWrapper,
  StyledInputBase,
} from "./components/Header";
import Search from "@mui/icons-material/Search";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [favouriteCocktails, setFavouriteCocktails] = useState([]);
  const [userInput, setUserInput] = useState("margarita");
  const [open, setOpen] = React.useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFavourite = (cocktailId) => {
    cocktails.map((cocktail) =>
      cocktail.idDrink === cocktailId
        ? setFavouriteCocktails([...favouriteCocktails, cocktail])
        : ""
    );
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

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="App">
      <Header
        favouriteCocktails={favouriteCocktails}
        toggleDrawer={toggleDrawer}
      />
      <Sidebar
        favouriteCocktails={favouriteCocktails}
        toggleDrawer={toggleDrawer}
        state={state}
      />
      {/* <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          inputProps={{ "aria-label": "search" }}
          sx={{ width: 300, marginBottom: 4, marginTop: 4 }}
          onChange={handleInput}
          placeholder="Search cocktail by name"
        />
      </Search> */}
      <TextField
        sx={{ width: 300, marginBottom: 4, marginTop: 4 }}
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
              setFavouriteCocktails={setFavouriteCocktails}
              handleAddFavourite={handleAddFavourite}
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
