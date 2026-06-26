import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <AnimatedBackground />
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
