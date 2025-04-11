import './App.css';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="min-h-screen min-w-[375px] bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">{/* Main content goes here */}</main>
    </div>
  );
}

export default App;
