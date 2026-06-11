import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

import { useAuth } from "./context/AuthContext";

function ProtectedRoute({
  children
}) {
  const {
    user,
    loading
  } = useAuth();

  if (loading)
    return <h2>Loading...</h2>;

  return user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

function PublicRoute({
  children
}) {
  const { user } = useAuth();

  return user ? (
    <Navigate to="/" />
  ) : (
    children
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;