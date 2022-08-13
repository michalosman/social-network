import Navbar from './components/Navbar'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const user = {}

  if (!user) return <AuthPage />

  return (
    <>
      <Navbar />
      {/* TODO: Routing */}
      {true && <ProfilePage />}
      {false && <HomePage />}
    </>
  )
}

export default App
