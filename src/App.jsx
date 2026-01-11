import { Routes, Route } from "react-router-dom";
import HomePage from "./main/HomePage";
import Navbar from "./nav/Navbar";
import ApiaryPage from "./apiary-page/ApiaryPage";
import NewHive from "./newhive/NewHive";
import HivePage from "./hivepage/HivePage";
import StatsPage from "./InspectionPage/StatsPage";

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
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
    </>
  );
};

export default App;
