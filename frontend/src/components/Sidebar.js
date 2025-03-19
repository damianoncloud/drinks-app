import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export default function Sidebar({ favouriteCocktails, toggleDrawer, state }) {
  //   const [state, setState] = React.useState({
  //     top: false,
  //     left: false,
  //     bottom: false,
  //     right: false,
  //   });

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  //   const toggleDrawer = (anchor, open) => (event) => {
  //     if (
  //       event &&
  //       event.type === "keydown" &&
  //       (event.key === "Tab" || event.key === "Shift")
  //     ) {
  //       return;
  //     }

  //     setState({ ...state, [anchor]: open });
  //   };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {favouriteCocktails.length ? (
        <h3 style={{ textAlign: "center" }}>List of favourite cocktails</h3>
      ) : (
        ""
      )}
      {favouriteCocktails.length > 0 ? (
        favouriteCocktails.map((favouriteCocktail) => (
          <ListItem key={favouriteCocktail.idDrink}>
            {favouriteCocktail.strDrink}
          </ListItem>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No favourite cocktails yet</p>
      )}
      {/* <List>
        {generate(
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Single-line item" />
          </ListItem>
        )}
      </List> */}
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <IconButton
            onClick={toggleDrawer(anchor, true)}
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            color="danger"
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              top: 0,
              //   transform: "translateY(50%)",
            }}
          >
            <Favorite />
            <p>{favouriteCocktails.length}</p>
          </IconButton> */}
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
