import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import WineInfo from "./components/wineInfo/WineInfo";

function RouterFile() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/wine" element={<WineInfo />} />
      </Routes>
    </Router>
  );
}

export default RouterFile;
