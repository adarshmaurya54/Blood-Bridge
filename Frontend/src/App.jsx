import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/shared/Layout/Layout"; // Layout component

function App() {
  return (
    <>
      <ToastContainer />
      <Layout />
    </>
  );
}

export default App;
