import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./contexts/AuthContext";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import Alert from "./components/layout/Alert";

const queryClient = new QueryClient();
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "15px",
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AlertProvider template={Alert} {...options}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </AlertProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
