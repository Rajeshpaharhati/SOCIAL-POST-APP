import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@mui/material";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } =
    useAuth();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Social Feed
        </Typography>

        <Typography
          sx={{ mr: 2 }}
        >
          {user?.username}
        </Typography>

        <Button
          color="inherit"
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;