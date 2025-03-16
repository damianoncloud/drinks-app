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
import WineBarIcon from "@mui/icons-material/WineBar";
import DescriptionIcon from "@mui/icons-material/Description";

const DrinkCardBack = ({ cocktail, handleClick }) => {
  if (!cocktail || !cocktail.strDrinkThumb || !cocktail.strDrink) {
    return <div>No cocktail data available</div>;
  }

  return (
    <div className="drinkCard">
      <Card variant="outlined" sx={{ width: 320 }}>
        <CardOverflow>
          {/* <AspectRatio objectFit="contain">
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
          </IconButton> */}
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">
            <Link href="#multiple-actions" overlay underline="none">
              {cocktail.strDrink}
            </Link>
          </Typography>
          <Typography level="body-xs">{cocktail.strInstructions}</Typography>
          <hr style={{ width: "100%" }} />
          <Typography level="title-sm">
            <p>Ingredients: </p>
            <ul style={{ listStyleType: "none" }}>
              {cocktail.strIngredient1 ? (
                <li>{cocktail.strIngredient1}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient2 ? (
                <li>{cocktail.strIngredient2}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient3 ? (
                <li>{cocktail.strIngredient3}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient4 ? (
                <li>{cocktail.strIngredient4}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient5 ? (
                <li>{cocktail.strIngredient5}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient6 ? (
                <li>{cocktail.strIngredient6}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient7 ? (
                <li>{cocktail.strIngredient7}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient8 ? (
                <li>{cocktail.strIngredient8}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient9 ? (
                <li>{cocktail.strIngredient9}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient10 ? (
                <li>{cocktail.strIngredient10}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient11 ? (
                <li>{cocktail.strIngredient11}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient12 ? (
                <li>{cocktail.strIngredient12}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient13 ? (
                <li>{cocktail.strIngredient13}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient14 ? (
                <li>{cocktail.strIngredient14}</li>
              ) : (
                ""
              )}
              {cocktail.strIngredient15 ? (
                <li>{cocktail.strIngredient15}</li>
              ) : (
                ""
              )}
            </ul>
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WineBarIcon />
            {cocktail.strGlass}
          </Typography>
        </CardContent>
        <CardOverflow variant="soft">
          <Divider inset="context" />
          <CardContent
            orientation="horizontal"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography level="body-xs">
              <button onClick={handleClick}>Flip back</button>
            </Typography>
            <Divider orientation="vertical" />
            <Typography level="body-xs">{cocktail.strAlcoholic}</Typography>
          </CardContent>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default DrinkCardBack;
