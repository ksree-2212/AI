import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Sprout, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: (token: string) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTY2MjQ0MjMsInN1YiI6ImM3YzM5NDBjLWM0ZTgtNGRiYy1hOWQwLTcyMDAxYTJiOGNkYyJ9.YuCbnnnhsid2A99BBhEtgxFLB21XztYYn_qJnF7GcH0";

  const handleLogin = async () => {
    if (!token.trim()) {
      toast({
        variant: "destructive",
        title: t('invalid_token'),
        description: "Please enter your access token"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call for authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept the default token or any non-empty token
      if (token === defaultToken || token.length > 10) {
        toast({
          title: "Login Successful",
          description: t('welcome_back')
        });
        onLogin(token);
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('invalid_token'),
        description: "Please check your access token and try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const useDefaultToken = () => {
    setToken(defaultToken);
  };

  return (
    <div className="min-h-screen gradient-earth flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full gradient-primary flex items-center justify-center">
            <Sprout className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            {t('welcome_back')}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="token">{t('enter_token')}</Label>
            <Input
              id="token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your access token..."
              className="h-12"
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 gradient-primary text-primary-foreground font-semibold"
          >
            {isLoading ? "Logging in..." : t('login')}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={useDefaultToken}
            className="w-full h-12"
          >
            Use Demo Token
          </Button>

          <Button
            variant="ghost"
            className="w-full"
          >
            <User className="mr-2 h-4 w-4" />
            {t('create_account')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};