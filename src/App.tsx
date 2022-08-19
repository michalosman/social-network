import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import useAuth from './contexts/AuthContext'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const { user } = useAuth()
  if (!user) return <AuthPage />

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
