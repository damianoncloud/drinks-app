import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/getmargherita").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h3>Drinks App</h3>
    </div>
  );
}

export default App;
