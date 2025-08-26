import Hero from './hero'
import Features from './features'
import Pricing from './pricing'
import BackendStatus from './backendstatus'
import Navbar from './navbar'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

// Missing imports added:
import { useAuthContext } from '@/context/AuthContext'
import { Skeleton } from './ui/skeleton'
import LoginForm from './auth/LoginForm'
import Dashboard from './dashboard'

const Index = () => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Dashboard />
    </div>
  )
}

export default Index
