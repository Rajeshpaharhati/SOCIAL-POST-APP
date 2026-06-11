import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from "@mui/material";

import { useState } from "react";

function CommentModal({
  open,
  onClose,
  onSubmit
}) {
  const [comment, setComment] =
    useState("");

  const handleSubmit = () => {
    if (!comment.trim())
      return;

    onSubmit(comment);

    setComment("");

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>
        Add Comment
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={3}
          margin="normal"
          autoFocus
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
        />

        <Button
          variant="contained"
          onClick={
            handleSubmit
          }
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default CommentModal;