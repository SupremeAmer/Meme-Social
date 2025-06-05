import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CardMedia, CircularProgress, Paper } from '@mui/material';
import { databases, ID, Permission, Role } from '../appwrite';
import { generateMemeWithAI } from '../services/aiMemeService';

export default function CreateMeme({ userId, onMemeCreated }) {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');

  async function handleGenerate() {
    setLoading(true);
    setError('');
    setImage('');
    try {
      const aiImageUrl = await generateMemeWithAI(prompt);
      setImage(aiImageUrl);
    } catch (err) {
      setError('Failed to generate meme. Try a different prompt!');
    }
    setLoading(false);
  }

  async function handlePost() {
    setLoading(true);
    setError('');
    try {
      await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        ID.unique(),
        { image, caption, prompt },
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(userId)),
          Permission.create(Role.user('any'))
        ]
      );
      setImage('');
      setPrompt('');
      setCaption('');
      if (onMemeCreated) onMemeCreated();
    } catch (err) {
      setError('Failed to post meme.');
    }
    setLoading(false);
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>AI Meme Generator</Typography>
      <TextField
        label="Describe your meme idea"
        fullWidth
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleGenerate} disabled={loading || !prompt}>
        Generate with AI
      </Button>
      {loading && <CircularProgress sx={{ display: 'block', margin: '1rem auto' }} />}
      {image && (
        <>
          <CardMedia
            component="img"
            image={image}
            alt="Generated Meme"
            sx={{ my: 2, borderRadius: 2, maxHeight: 350 }}
          />
          <TextField
            label="Add a caption (optional)"
            fullWidth
            value={caption}
            onChange={e => setCaption(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="success" onClick={handlePost}>
            Post Meme
          </Button>
        </>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Paper>
  );
}
