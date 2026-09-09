import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProviders } from "./router/ProtectedLayout"
import Dashboard from "./pages/Dashboard/Dashboard";
import LayoutSidebar from "./layout/LayoutSidebar";
import PageDespliegue from "./pages/PageDespliegue/PageDespliegue";
import PageCard from "./pages/PageCard/PageCard";

function App() {

  return (
    <>
      <Router>

        <AppProviders>
          <Routes>

            <Route element={<LayoutSidebar />}>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/page-despliegue" element={<PageDespliegue />} />
              <Route path="/page-card" element={<PageCard />} />
            </Route>

            {/* <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} /> */}

          </Routes>
        </AppProviders>

      </Router>
    </>
  )
}

export default App
