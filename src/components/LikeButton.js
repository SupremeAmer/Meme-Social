import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { databases } from '../appwrite/config';

const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.REACT_APP_APPWRITE_MEMES_COLLECTION_ID;

export default function LikeButton({ meme, user, refreshFeed }) {
  const [liked, setLiked] = useState(meme.likes?.includes(user?.$id));
  const [likeCount, setLikeCount] = useState(meme.likes?.length || 0);

  const handleLike = async () => {
    if (!user) return;
    let newLikes = new Set(meme.likes || []);
    if (liked) {
      newLikes.delete(user.$id);
    } else {
      newLikes.add(user.$id);
    }
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, meme.$id, {
      likes: Array.from(newLikes),
    });
    setLiked(!liked);
    setLikeCount(newLikes.size);
    refreshFeed(); // to reload likes from backend
  };

  return (
    <IconButton onClick={handleLike} color={liked ? 'secondary' : 'default'} sx={{ transition: 'color 0.3s' }}>
      <FavoriteIcon sx={{ fontSize: 28 }} />
      <span style={{ marginLeft: 6 }}>{likeCount}</span>
    </IconButton>
  );
}