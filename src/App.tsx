import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import useAuth from './hooks/useAuth'
import AuthPage from './pages/AuthPage'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import LoadingPage from './pages/LoadingPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const { user, initialLoading } = useAuth()

  if (initialLoading) return <LoadingPage />
  if (!user) return <AuthPage />

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:profileId" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
