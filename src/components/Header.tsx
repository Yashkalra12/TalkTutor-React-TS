import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  color: "white",
  margin: "0.5rem",
  textDecoration: "none",
};

const Header = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={1}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          mr={"auto"}
          color={"#fff"}
        >
          TalkTutor
        </Typography>
        <Link
          style={styles}
          to={"/"}
        >
          Home
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
