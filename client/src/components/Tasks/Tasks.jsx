import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Task from '../Task/Task';
import TaskModal from '../TaskModal/TaskModal';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
export default function Tasks() {
  const userId = useSelector((state) => state.user.userId);
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const handleCreateModal = () => {
    setCreateModal(!createModal);
  };

  const handleEditModal = () => {
    setEditModal(!editModal);
  };

  useEffect(() => {
    async function fetchTasks() {
      await axios
        .get('http://localhost:8000/user-tasks', {
          params: {
            userId: userId,
          },
        })
        .then((res) =>
          dispatch({ type: 'LOAD_TASKS', payload: res.data.data })
        );
    }
    fetchTasks();
  }, [createModal, editModal]);

  return (
    <div>
      <Link style={{ textDecoration: 'none' }} to="/">
        <Button style={{ marginBottom: 20 }} variant="contained">
          Log out
        </Button>
      </Link>
      <TaskModal handleCreateModal={handleCreateModal} />
      <div style={{ marginTop: 50 }}>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => {
            return (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Task
                  handleEditModal={handleEditModal}
                  title={task.title}
                  description={task.description}
                  taskId={task._id}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
