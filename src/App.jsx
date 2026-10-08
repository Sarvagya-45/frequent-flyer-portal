import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import FrequentFlyerPortal from "./features/frequentFlyer/FrequentFlyerPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/portal" element={<FrequentFlyerPortal />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route path="/terms" element={<Terms />} />

          <Route
            path="/frequent-flyer"
            element={<Navigate to="/portal" replace />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
