import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

function App() {
  const user = {}

  if (!user) return <AuthPage />
  return <HomePage />
}

export default App
