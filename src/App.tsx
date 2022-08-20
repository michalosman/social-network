import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import useAuth from './contexts/AuthContext'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import LoadingPage from './pages/LoadingPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const { user, initialLoading } = useAuth()

  if (initialLoading) return <LoadingPage />
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
