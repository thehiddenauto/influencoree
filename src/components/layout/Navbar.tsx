import React from 'react'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/components/auth/AuthProvider'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { LogOut, User } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export const Navbar: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuthContext()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) return null

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">InfluencorEE</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="text-sm">{user?.email}</span>
          </div>
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}