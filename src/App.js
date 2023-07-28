import AddTodo from './components/AddTodo';
import Navbar from './components/Navbar';
import './css/App.css';
function App() {
  return (
    <div>
      <Navbar/>
    <div className="card-container">
      
     <AddTodo/>
     </div>
    </div>
  );
}

export default App;
