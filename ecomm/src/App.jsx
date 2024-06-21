// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import ProductsList from "./ProductsList";
import RequireAuth from "./RequireAuth";
import SearchPage from "./SearchPage";

const App = () => {
  return (
    <div className="vh-100 bg-dark">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Wrapped with RequireAuth for authentication check */}
            <Route
              path="/products"
              element={
                <RequireAuth>
                  <ProductsList />
                </RequireAuth>
              }
            />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <ProductsList />
                </RequireAuth>
              }
            />
            <Route
              path="/update/:id"
              element={
                <RequireAuth>
                  <UpdateProduct />
                </RequireAuth>
              }
            />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/search" element={<SearchPage />} />{" "}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
