import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Stack,
  Avatar,
  Box
} from "@mui/material";

import {
  Favorite,
  Comment
} from "@mui/icons-material";

import { useState } from "react";

import api from "../api/axios";

import CommentModal from "./CommentModal";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function PostCard({
  post,
  updatePost
}) {
  const [open, setOpen] =
    useState(false);

  const handleLike = async () => {
    try {
      const res = await api.post(
        `/posts/${post._id}/like`
      );

      updatePost(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment =
    async (comment) => {
      try {
        const res = await api.post(
          `/posts/${post._id}/comment`,
          { comment }
        );

        updatePost(res.data.post);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Card sx={{ mb: 3, ml: 3, maxWidth: 700 }}>
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40
              }}
            >
              {post.user?.username
                ?.charAt(0)
                .toUpperCase()}
            </Avatar>
            <Stack
              direction="column"
              spacing={0}
            >
              <Typography
                variant="h6"
              >
                {
                  post.user
                    ?.username
                }
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {dayjs(post.createdAt).fromNow()}
              </Typography>
            </Stack>
          </Stack>

          <Typography
            sx={{ mt: 1 }}
          >
            {post.text}
          </Typography>
        </CardContent>

        {post.image && (
          <CardMedia
            component="img"
            image={post.image}
            sx={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        )}

        <CardContent>
          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              startIcon={
                <Favorite />
              }
              onClick={
                handleLike
              }
            >
              {
                post.likes
                  ?.length
              }
            </Button>

            <Button
              startIcon={
                <Comment />
              }
              onClick={() =>
                setOpen(
                  true
                )
              }
            >
              {
                post.comments
                  ?.length
              }
            </Button>
          </Stack>

          {post.comments?.map(
            (
              comment,
              index
            ) => (
              <Typography
                key={index}
                sx={{
                  mt: 1
                }}
              >
                <strong>
                  {
                    comment.username
                  }
                </strong>
                :{" "}
                {
                  comment.comment
                }
              </Typography>
            )
          )}
        </CardContent>
      </Card>

      <CommentModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        onSubmit={
          addComment
        }
      />
    </>
  );
}

export default PostCard;