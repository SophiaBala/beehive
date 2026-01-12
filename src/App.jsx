import { Routes, Route } from "react-router-dom";
import HomePage from "./main/HomePage";
import Navbar from "./nav/Navbar";
import ApiaryPage from "./apiary-page/ApiaryPage";
import NewHive from "./newhive/NewHive";
import HivePage from "./hivepage/HivePage";
import StatsPage from "./InspectionPage/StatsPage";
import Harvest from "./harvest/Harvest.jsx";
import AddHarvest from "./harvest/AddHarvest";
import Queen from "./queen/Queen";
import Profile from "./profile/Profile";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apiary/:id" element={<ApiaryPage />} />
        <Route path="/new-hive" element={<NewHive />} />
        <Route path="/new-hive/:apiaryId" element={<NewHive />} />
        <Route path="/hive/:apiaryId/:hiveId" element={<HivePage />} />
        <Route path="/harvest/:apiaryId/:hiveId" element={<Harvest />} />
        <Route path="/harvest/add/:apiaryId/:hiveId" element={<AddHarvest />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/queen/:apiaryId/:hiveId" element={<Queen />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
