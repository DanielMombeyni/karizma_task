import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store, { persistor } from "./utils/store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import PathConstants from './utils/path/path.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import DashBoard from './pages/Dashboard.jsx';
import Chart from './pages/Chart.jsx';
import SignUp from './pages/SignUp.jsx';



function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <div className="min-h-screen bg-gray-800 text-white">
            <Routes path={PathConstants.Home}>
              <Route index exact element={<Home />} />
              {/* Dashboard */}
              <Route
                path={PathConstants.DashBoard}
                element={<DashBoard />}
              />
              <Route
                path={PathConstants.Chart}
                element={<Chart />}
              />
              {/* Authentication */}
              <Route
                path={PathConstants.SignIn}
                element={<Login />}
              />
              <Route
                path={PathConstants.SignUp}
                element={<SignUp />}
              />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
