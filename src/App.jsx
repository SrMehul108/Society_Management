import { RouterProvider } from "react-router-dom";
import DashStackRoute from "./routes";
import "./App.css";
import { Suspense } from "react";

function App() {

  return <Suspense fallback={"Page Is Loading"}><RouterProvider router={DashStackRoute} /></Suspense> ;
}

export default App;
