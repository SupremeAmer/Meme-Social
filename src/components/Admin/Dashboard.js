import React, { useEffect, useState } from 'react';
import { databases } from '../../appwrite/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.REACT_APP_APPWRITE_MEMES_COLLECTION_ID;

export default function Dashboard() {
  const [memes, setMemes] = useState([]);

  const fetchMemes = async () => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, ['orderDesc(created_at)']);
    setMemes(res.documents);
  };

  useEffect(() => { fetchMemes(); }, []);

  const handleDelete = async (id) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    fetchMemes();
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Admin Dashboard: All Memes</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Top Text</TableCell>
              <TableCell>Bottom Text</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memes.map(row => (
              <TableRow key={row.$id}>
                <TableCell>{row.user_name}</TableCell>
                <TableCell>{row.top_text}</TableCell>
                <TableCell>{row.bottom_text}</TableCell>
                <TableCell>{(new Date(row.created_at)).toLocaleString()}</TableCell>
                <TableCell>{row.likes?.length || 0}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDelete(row.$id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}