import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NavBarLayout from './components/layout/NavBarLayout'
import AuthLayout from './components/layout/AuthLayout'
import Login from './page/LoginPage/Index'
import UserList from './page/UserList/Index'
import Register from './Page/register'
import HomeScreen from './page/homeScreen/index'
import { ProtectedRoute, LogedUsers, AdminRoutes } from './components/ProtectedRoute'


function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Layout for authenticated users */}
            <Route element={<NavBarLayout />}>
            <Route element={<AdminRoutes />}>
              <Route path="/users" element={<UserList />} />
            </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomeScreen />} />
              </Route>
            </Route>

            {/* Layout for unauthenticated users */}
            <Route element={<AuthLayout />}>
              <Route element={<LogedUsers />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App