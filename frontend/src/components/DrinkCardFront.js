import React from "react";
import { useState } from "react";
// import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import axios from "axios";

const DrinkCardFront = ({
  cocktail,
  handleClick,
  handleClickOpen,
  setQrCodeUrl,
  handleAddFavourite,
}) => {
  if (!cocktail || !cocktail.strDrinkThumb || !cocktail.strDrink) {
    return;
  }

  const handleBuy = (cocktailId) => {
    console.log(cocktailId);
    // API call to generate QR code
    axios
      .get(`http://127.0.0.1:5000/api/generateqrcode/${cocktailId}`, {
        // Set response type as blob (binary file)
        responseType: "blob",
      })
      .then((response) => {
        // Create temporary URL to render QR Code image
        const qrUrl = URL.createObjectURL(response.data);
        // Set qrUrl in state
        setQrCodeUrl(qrUrl);
        // Open qrCode Modal
        handleClickOpen();
      })
      .catch((error) => {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <div className="drinkCard">
      <Card variant="outlined" sx={{ width: 320 }}>
        <CardOverflow>
          <AspectRatio objectFit="contain">
            <img
              src={cocktail.strDrinkThumb}
              srcSet={cocktail.strDrinkThumb}
              loading="lazy"
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </AspectRatio>
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            color="neutral"
            onClick={() => handleAddFavourite(cocktail.idDrink)}
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
            }}
          >
            <Favorite />
          </IconButton>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">
            <Link href="#multiple-actions" overlay underline="none">
              {cocktail.strDrink}
            </Link>
          </Typography>
          <Typography level="body-xs">
            <Link href="#multiple-actions">
              Category: {cocktail.strCategory}
            </Link>
          </Typography>
        </CardContent>
        <CardOverflow variant="soft">
          <Divider inset="context" />
          <CardContent
            orientation="horizontal"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography level="body-xs">
              <Button variant="contained" onClick={handleClick}>
                DETAILS
              </Button>
              <Button
                variant="contained"
                sx={{ marginLeft: "6px" }}
                onClick={() => handleBuy(cocktail.idDrink)}
              >
                BUY
              </Button>
            </Typography>
            <Divider orientation="vertical" />
            <Typography level="body-xs">{cocktail.strAlcoholic}</Typography>
          </CardContent>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default DrinkCardFront;
