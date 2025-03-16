import React from "react";
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

const DrinkCardFront = ({ cocktail, handleClick }) => {
  if (!cocktail || !cocktail.strDrinkThumb || !cocktail.strDrink) {
    return;
  }

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
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography level="body-xs">
              <button onClick={handleClick}>DETAILS</button>
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
