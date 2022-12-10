import { Header } from "./components/Header";
import { Finder } from "./containers/Finder";
import "./App.css";
import { FinderProvider } from "./contexts/FinderContext";

const App = () => {
  return (
    <div className="App">
      <FinderProvider>
        <Header />
        <Finder />
      </FinderProvider>
    </div>
  );
};

export default App;
