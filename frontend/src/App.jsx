import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
