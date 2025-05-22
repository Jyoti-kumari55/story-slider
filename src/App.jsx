import "./App.css";
import MainStoryGroup from "./components/MainStoryGroup";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-[40px] font-bold text-center mb-8">
          Welcome to the Story Teller
        </h1>
        <MainStoryGroup />
      </div>
    </>
  );
}

export default App;
