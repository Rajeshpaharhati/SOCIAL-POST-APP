import { Paper, TextField, Button, Stack, Box, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
    }
  };

  const submitHandler = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text for your post");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("image", image);

      const res = await api.post("/posts", formData);
      onPostCreated?.(res.data.post);
      setText("");
      setImage(null);
      setFileName("");
      toast.success("Post created successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Stack spacing={2}>
        <TextField
          multiline
          rows={3}
          label="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Box>
          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            Choose Image (Optional)
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {fileName && (
            <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
              Selected: {fileName}
            </Typography>
          )}
        </Box>

        <Button variant="contained" onClick={submitHandler} disabled={loading}>
          {loading ? "Posting..." : "Create Post"}
        </Button>
      </Stack>
    </Paper>
  );
}


export default CreatePost;