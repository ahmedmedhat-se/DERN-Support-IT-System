import { Routes, Route } from "react-router-dom";

// Importing Layouts
import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import Homepage from "./Components/Layouts/Homepage";
import NotFound from "./Components/Layouts/NotFound";

// Importing Components
import Services from "./Components/Services";
import Installations from "./Components/Installations";
import AboutUs from "./Components/AboutUs";
import FeedbackList from "./Components/FeedbackList";

// Importing Products Data
import { ProductProvider } from "./Components/store/ProductContext";
import Products from "./Components/store/Products";

// Importing Registerations
import AuthForm from "./Components/registerations/AuthForm";
import Logout from "./Components/registerations/Logout";

// Importing Tools
import GoToTop from "./Components/GoToTop";

// Importing Dashboards
import AdminDashboard from "./Components/admin/AdminDashboard";
import UserDashboard from "./Components/admin/UserDashboard";
import ProtectedAdminRoute from "./Components/admin/ProtectedAdminRoute";
import ProtectedUserRoute from "./Components/admin/ProtectedUserRoute";

function App() {
  return (
    <>
      <ProductProvider>
        <Header />
        <Routes>
          {/* Layout Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />

          {/* Components Routes */}
          <Route path="/services" element={<Services />} />
          <Route path="/installations" element={<Installations />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/feedbacks" element={<FeedbackList />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Protected User Routes */}
          <Route element={<ProtectedUserRoute />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <GoToTop />
        <Footer />
      </ProductProvider>
    </>
  );
}

export default App;
