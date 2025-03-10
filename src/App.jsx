import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import TipsPage from "./pages/TipsPage";
import ViewAquariumsPage from "./pages/ViewAquariumsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

// Import our new pages
import BeginnerGuide from "./pages/BeginnerGuide";
import FishSpecies from "./pages/FishSpecies";
import ParameterCalculator from "./pages/ParameterCalculator";
import MaintenanceCalendar from "./pages/MaintenanceCalendar";
import PlantSpecies from "./pages/PlantSpecies";
import CartPage from "./pages/CartPage";

// Import CartProvider
import { CartProvider } from "./contexts/CartContext";

// Import new product pages
import ProductsFish from "./pages/ProductsFish";
import ProductsPlants from "./pages/ProductsPlants";
import ProductsEquipment from "./pages/ProductsEquipment";

// Import CheckoutPage
import CheckoutPage from './pages/CheckoutPage';

// Create a component to wrap Routes with AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <RegisterPage />
            </PageTransition>
          }
        />
        <Route
          path="/tips"
          element={
            <PageTransition>
              <TipsPage />
            </PageTransition>
          }
        />
        <Route
          path="/my-aquariums"
          element={
            <PageTransition>
              <ViewAquariumsPage />
            </PageTransition>
          }
        />
        <Route
          path="/beginner-guide"
          element={
            <PageTransition>
              <BeginnerGuide />
            </PageTransition>
          }
        />
        <Route
          path="/fish-species"
          element={
            <PageTransition>
              <FishSpecies />
            </PageTransition>
          }
        />
        <Route
          path="/parameter-calculator"
          element={
            <PageTransition>
              <ParameterCalculator />
            </PageTransition>
          }
        />
        <Route
          path="/maintenance-calendar"
          element={
            <PageTransition>
              <MaintenanceCalendar />
            </PageTransition>
          }
        />
        <Route
          path="/plant-species"
          element={
            <PageTransition>
              <PlantSpecies />
            </PageTransition>
          }
        />
        <Route
          path="/cart"
          element={
            <PageTransition>
              <CartPage />
            </PageTransition>
          }
        />
        <Route
          path="/products/fish"
          element={
            <PageTransition>
              <ProductsFish />
            </PageTransition>
          }
        />
        <Route
          path="/products/plants"
          element={
            <PageTransition>
              <ProductsPlants />
            </PageTransition>
          }
        />
        <Route
          path="/products/equipment"
          element={
            <PageTransition>
              <ProductsEquipment />
            </PageTransition>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageTransition>
              <CheckoutPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen pt-24">
          <Header />
          <ScrollToTop />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
