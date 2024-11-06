import { RouterProvider } from "react-router-dom";
import DashStackRoute from "./routes";
import "./App.css";

function App() {
  return <RouterProvider router={DashStackRoute} />;
}

export default App;
