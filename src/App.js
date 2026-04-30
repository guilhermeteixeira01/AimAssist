import "./Global.css";

import Background from "./components/background";
import Home from "./components/home";
import Features from "./components/features";
import Platforms from "./components/games";

function App() {
  return (
    <div className="App">
      <Background />
      <Home />
      <Features />
      <Platforms />
    </div>
  );
}

export default App;
