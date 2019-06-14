import React from "react";
import { Grid } from "semantic-ui-react";
import Navbar from "../../components/Navbar/Navar";
import Search from "../../components/Search/Search";

const styles = {
  grid: {
    height: "50%",
    width: "90%",
    margin: "0 auto",
    padding: "1em"
  }
};
const Home = () => {
  return (
    <div>
      <Navbar />
      <Grid verticalAlign="middle" style={styles.grid}>
        <Search />
      </Grid>
    </div>
  );
};

export default Home;
