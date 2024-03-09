import { Box } from "@mui/material";
import PrimaryAppBar from "../templates_/PrimaryAppBar";
import PrimaryDraw from "../templates_/PrimaryDraw";
import SecondaryDraw from "../templates_/SecondaryDraw";
import Main from "../templates_/Main";
import PopularChannels from "../components/PrimaryDraw/PopularChannels";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";
import ExploreServers from "../components/Main/ExploreServers";
//////////////////////////////////////////////////////

/////////////////////////////////////////////
const Explore = () => {
  ///////////////////////////////////
  return (
    <Box sx={{ display: "flex" }}>
      <PrimaryAppBar />
      <PrimaryDraw>
        <PopularChannels isDrawerOpen={true} />
      </PrimaryDraw>
      <SecondaryDraw>
        <ExploreCategories />
      </SecondaryDraw>
      <Main>
        <ExploreServers />
      </Main>
    </Box>
  );
};

export default Explore;
