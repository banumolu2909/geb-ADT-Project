import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Add from "./pages/Add";
import Orders from "./pages/orders";
// import Update from "./pages/Update";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Orders/>}/>
          <Route path="/add" element={<Add/>}/>
          {/* <Route path="/update" element={<Update/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
