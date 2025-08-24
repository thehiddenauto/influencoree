import React from 'react'
import { useAuthContext } from '@/components/auth/authprovider'
import { LoginForm } from '@/components/auth/loginform'
import { Dashboard } from '@/components/dashboard/dashboard'
import { Navbar } from '@/components/layout/navbar'
import { Skeleton } from '@/components/ui/skeleton'

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

export default Index;
