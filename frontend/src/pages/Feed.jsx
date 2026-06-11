import {
  Container,
  CircularProgress,
  Box,
  Typography,
  Button
} from "@mui/material";

import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Feed() {
  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const fetchPosts = async () => {
    try {
      setLoading(page === 1);
      const res = await api.get(`/posts?page=${page}`);
      if (page === 1) {
        setPosts(res.data.posts || []);
      } else {
        setPosts((prev) => [
          ...prev,
          ...(res.data.posts || [])
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = (updatedPost) => {
  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post._id === updatedPost._id
        ? updatedPost
        : post
    )
  );
};
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const addNewPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent:
            "center",
          mt: 5
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "320px 1fr"
          },
          gap: 4,
          px: 2,
          py: 4
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "320px"
            }
          }}
        >
          <CreatePost
            onPostCreated={addNewPost}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "720px"
              }
            }}
          >
            {posts.length === 0 ? (
              <Typography
                align="center"
                sx={{ mt: 4 }}
              >
                No posts yet. Create your first post!
              </Typography>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  updatePost={updatePost}
                />
              ))
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={() => setPage(page + 1)}
              sx={{ mt: 2 }}
            >
              Load More
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Feed;