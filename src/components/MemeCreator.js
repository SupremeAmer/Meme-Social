import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { databases, storage, ID } from "../appwrite/config";

function MemeCreator() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file || !caption) return alert("Please add a file and caption!");

    try {
      const uploadedFile = await storage.createFile(
        process.env.REACT_APP_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );

      await databases.createDocument(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_APPWRITE_MEMES_COLLECTION_ID,
        ID.unique(),
        {
          caption,
          fileId: uploadedFile.$id,
        }
      );
      setCaption("");
      setFile(null);
      alert("Meme uploaded!");
    } catch (err) {
      alert("Error uploading meme!");
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        label="Caption"
        value={caption}
        onChange={e => setCaption(e.target.value)}
        fullWidth
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
        style={{ marginTop: 8 }}
      />
      <Button variant="contained" onClick={handleUpload} sx={{ mt: 1 }}>
        Upload Meme
      </Button>
    </Box>
  );
}

export default MemeCreator;