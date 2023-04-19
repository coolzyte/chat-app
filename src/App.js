import Home from './pages/Home';
import LoginForm from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import RegistrationForm from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' />

        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
