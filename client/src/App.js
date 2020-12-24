import './App.css';
import io from 'socket.io-client';
import { useEffect } from 'react'
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  useEffect(() => {
    // io.connect('http://localhost:5000/');
  })
  const routes = useRoutes();
  return (
    <Router>
      <div className="App">
        {routes}
      </div>
    </Router>
  );
}

export default App;
