import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home'; 
import 'bootstrap/dist/css/bootstrap.css'
import CreateTodoApp from './component/CreateTodoApp';
import UpdateTodoApp from './component/UpdateTodoApp';
import DetailTodoApp from './component/DetailTodoApp';
function App() {
  return (
    <Routes>
      <Route path= {`/`} element={<Home/>} />
      <Route path= {`/createTodo`} element={<CreateTodoApp/>} />
      <Route path= {`/update/:id`} element={<UpdateTodoApp/>} />
      <Route path= {`/getByID/:id`} element={<DetailTodoApp/>} />
    </Routes>
  );
}

export default App;
