import ReactDom from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDom.createRoot(document.getElementById("root")).render(
  <Provider>
    <PersistGate>
      <App />
    </PersistGate>
  </Provider>
);
