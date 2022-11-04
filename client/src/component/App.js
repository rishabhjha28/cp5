import { Routes,Route } from 'react-router-dom';
import '../App.css';
import { Dashboard } from './Dashboard';
import { HomePage } from './HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element={<HomePage/>} />
        <Route path = '/dashboard' element={<Dashboard/>}/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
