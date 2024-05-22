import logo from './logo.svg';
import './App.css';
import BookTable from './components/BookTable/BookTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Admin Dashboard</h1>
      </header>
      <main>
        <BookTable />
      </main>
    </div>
  );
}

export default App;
