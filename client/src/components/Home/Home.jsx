import { Button, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import './Home.css';
export default function Home() {
  return (
    <div>
      <Container maxWidth="sm">
        <div className="content">
          <Link
            style={{
              textDecoration: 'none',
              marginRight: 25,
              marginBottom: 25,
            }}
            to="/login">
            <Button variant="contained">Login</Button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/register">
            <Button variant="contained">Register</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
