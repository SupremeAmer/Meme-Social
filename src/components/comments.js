import React, { useState, useEffect } from 'react';
import { databases, ID } from '../appwrite/config';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const COMMENTS_COLLECTION_ID = process.env.REACT_APP_APPWRITE_COMMENTS_COLLECTION_ID;

export default function Comments({ meme, user }) {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COMMENTS_COLLECTION_ID, [
        `meme_id=${meme.$id}`,
        'orderAsc(created_at)'
      ]);
      setComments(res.documents);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => { fetchComments(); }, [meme.$id]);

  const handleAddComment = async () => {
    if (!value.trim() || !user) return;
    setLoading(true);
    await databases.createDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, ID.unique(), {
      meme_id: meme.$id,
      user_id: user.$id,
      user_name: user.name,
      text: value,
      created_at: new Date().toISOString(),
    });
    setValue('');
    setLoading(false);
    fetchComments();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Comments</Typography>
      {comments.map((c) => (
        <Box key={c.$id} sx={{ mb: 1, pl: 1, borderLeft: '2px solid #eee' }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{c.user_name}:</Typography>
          <Typography variant="body2">{c.text}</Typography>
        </Box>
      ))}
      {user && (
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <TextField
            size="small"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Write a comment…"
            fullWidth
          />
          <Button onClick={handleAddComment} variant="contained" disabled={loading}>
            Post
          </Button>
        </Box>
      )}
    </Box>
  );
}