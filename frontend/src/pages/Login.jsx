import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/login",
        formData
      );

      login(
        res.data.token,
        res.data.user
      );

      toast.success(
        "Login Successful"
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%"
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            Login
          </Typography>

          <form
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              autoComplete="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
            />

            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              {loading
                ? "Please wait..."
                : "Login"}
            </Button>
          </form>

          <Typography
            sx={{ mt: 2 }}
            align="center"
          >
            New User?{" "}
            <Link to="/signup">
              Signup
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;