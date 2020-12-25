import io from 'socket.io-client';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { createContext } from 'react';

const socket = io.connect('localhost:1337');
export const SocketContext = createContext({ socket });

function App() {
  // setSocket(socket)
  const routes = useRoutes();
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="App">
          {routes}
        </div>
      </Router>
    </SocketContext.Provider>
  );
}

export default App; 
