import { Button, Checkbox } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditModal from '../EditModal/EditModal';
import './Task.css';
import env from 'react-dotenv';

export default function Task({ title, description, taskId, handleEditModal }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState(false);

  const userId = useSelector((state) => state.user.userId);

  const changeStatus = () => setStatus(!status);

  const handleDelete = () => {
    axios
      .delete(`${env.SERVER_URL}/delete-task`, {
        data: { taskId: taskId },
      })
      .then((res) => dispatch({ type: 'LOAD_TASKS', payload: res.data.data }));
  };

  useEffect(() => {
    async function fetchTasks() {
      await axios
        .get(`${env.SERVER_URL}/user-tasks`, {
          params: {
            userId: userId,
          },
        })
        .then((res) =>
          dispatch({ type: 'LOAD_TASKS', payload: res.data.data })
        );
    }
    fetchTasks();
  }, [modal]);

  return (
    <div className="tasks">
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Status: {status ? 'Completed' : 'Pending'}</p>
      <Checkbox onChange={changeStatus} />
      <div className="btn-block">
        <Button onClick={handleDelete} variant="contained">
          Delete
        </Button>
        <EditModal handleEditModal={handleEditModal} taskId={taskId} />
      </div>
    </div>
  );
}
