import React from 'react';
import { useSelector } from 'react-redux';
import './Main.css';
import Tasks from '../Tasks/Tasks';

export default function Main() {
  const userName = useSelector((state) => state.user.userName);

  return (
    <div className="main">
      <h1>Welcome {userName}</h1>
      <Tasks />
    </div>
  );
}
