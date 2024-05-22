import logo from './logo.svg';
import './App.css';
import BookTable from './components/BookTable/BookTable';
import { initKeycloak, isAuthenticated, login, logout } from './service/Service';
import { useEffect , useState} from 'react';
  

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeKeycloak = async () => {
      const success = await initKeycloak();
      setInitialized(success);
    };
    initializeKeycloak();
  }, []);

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated() ? (
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <div className="App">
        <header className="App-header">
          <h1>Admin Dashboard</h1>
        </header>
        <main>
          <BookTable />
        </main>
      </div>
    </div>
  );
}

export default App;