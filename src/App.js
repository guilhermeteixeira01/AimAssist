import "./Global.css";

import Background from "./components/background";
import Home from "./components/home";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <Background />
      <Header />
      <Home />
    </div>
  );
}

export default App;
