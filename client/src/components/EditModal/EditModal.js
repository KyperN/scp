import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import env from 'react-dotenv';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ handleEditModal, taskId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const editTask = async () => {
    await axios
      .patch(`${env.SERVER_URL}/edit-task`, {
        taskId: taskId,
        title: title,
        description: description,
      })
      .then((res) => {
        handleEditModal();
        setTitle('');
        setDescription('');
      });
  };
  return (
    <div>
      <Button
        style={{ marginTop: 20, marginBottom: 20 }}
        variant="contained"
        onClick={handleOpen}>
        Edit Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              onChange={handleTitle}
              value={title}
              id="outlined-basic"
              label="Title"
              variant="outlined"
            />
            <TextField
              onChange={handleDescription}
              value={description}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}>
            <Button
              onClick={editTask}
              disabled={title === '' || description === ''}
              variant="contained">
              Edit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
