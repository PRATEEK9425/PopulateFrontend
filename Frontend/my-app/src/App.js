import logo from './logo.svg';
import './App.css';
import RoutingApp from './Approuting/RoutingApp';
import Navbar from './Pages/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ToastContainer    />
      <Navbar/>
      <RoutingApp/>
    </div>
  );
}

export default App;
