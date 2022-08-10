import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

function App() {
  const user = null

  if (!user) return <AuthPage />
  return <HomePage />
}

export default App
