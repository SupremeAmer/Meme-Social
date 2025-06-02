import React, { useEffect, useState } from "react";
import { databases, storage } from "../appwrite/config";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

function MemeFeed() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await databases.listDocuments(
          process.env.REACT_APP_APPWRITE_DATABASE_ID,
          process.env.REACT_APP_APPWRITE_MEMES_COLLECTION_ID
        );
        setMemes(res.documents.reverse());
      } catch (err) {
        setMemes([]);
      }
    };
    fetchMemes();
  }, []);

  return (
    <Box>
      {memes.map(meme => (
        <Card key={meme.$id} sx={{ mb: 2 }}>
          <CardMedia
            component="img"
            height="240"
            image={storage.getFilePreview(process.env.REACT_APP_APPWRITE_BUCKET_ID, meme.fileId)}
            alt={meme.caption}
          />
          <CardContent>
            <Typography>{meme.caption}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default MemeFeed;