import { useBackend } from '@/hooks/useBackend';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

const BackendStatus = () => {
  const { isConnected, isLoading, error, reconnect } = useBackend();

  if (isLoading) {
    return (
      <Alert>
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertDescription>
          Connecting to backend...
        </AlertDescription>
      </Alert>
    );
  }

  if (isConnected) {
    return (
      <Alert>
        <CheckCircle className="h-4 w-4 text-primary" />
        <AlertDescription>
          Backend connected successfully
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive">
      <XCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center gap-2">
        Backend connection failed
        {error && <span className="text-sm">({error})</span>}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={reconnect}
          className="ml-auto"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default BackendStatus;
