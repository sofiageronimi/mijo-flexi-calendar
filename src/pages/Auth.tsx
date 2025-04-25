import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast({ title: 'Errore', description: 'Inserisci email e password', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      // Simulazione login (in realtà dovresti usare una chiamata API)
      const userData = { email: loginEmail, name: 'Utente MiJob' };
      localStorage.setItem('mijob_authenticated', 'true');
      localStorage.setItem('mijob_user', JSON.stringify(userData));

      trackEvent('auth', 'login', loginEmail);

      toast({ title: 'Accesso effettuato', description: 'Benvenuto su MiJob!' });
      navigate('/profile');
    } catch (err) {
      toast({ title: 'Errore', description: 'Errore durante l\'accesso', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!registerFirstName || !registerLastName || !registerEmail || !registerPassword || !confirmPassword) {
      toast({ title: 'Errore', description: 'Compila tutti i campi richiesti', variant: 'destructive' });
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast({ title: 'Errore', description: 'Le password non coincidono', variant: 'destructive' });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: 'Errore',
        description: 'Devi accettare i termini di servizio e l\'informativa sulla privacy',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      // Simulazione registrazione a chiamata API)
      const userData = {
        email: registerEmail,
        name: `${registerFirstName} ${registerLastName}`,
      };
      localStorage.setItem('mijob_authenticated', 'true');
      localStorage.setItem('mijob_user', JSON.stringify(userData));

      // Tracciamento conforme GDPR dopo accettazione termini
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'registrazione_completata',
          user_registration_data: {
            nome: registerFirstName,
            cognome: registerLastName,
            email: registerEmail,
          },
        });
      }

      toast({
        title: 'Registrazione completata',
        description: 'Benvenuto su MiJob! Ora puoi iniziare a creare il tuo calendario personalizzato.'
      });
      navigate('/profile');
    } catch (err) {
      toast({ title: 'Errore', description: 'Errore durante la registrazione', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Accedi</TabsTrigger>
              <TabsTrigger value="register">Registrati</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Accedi al tuo account</CardTitle>
                  <CardDescription>
                    Inserisci le tue credenziali per accedere al tuo account MiJob.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="La tua email" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm text-mijob-blue hover:underline">
                          Password dimenticata?
                        </a>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="La tua password" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required 
                      />
                    </div>
                    <Button className="w-full" type="submit" disabled={loading}>
                      {loading ? "Accesso in corso..." : "Accedi"}
                    </Button>
                  </form>
                  
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Oppure continua con</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full" type="button">
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" className="w-full" type="button">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Facebook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Crea un account</CardTitle>
                  <CardDescription>
                    Registrati per iniziare a usare MiJob e trovare lavoretti flessibili.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input 
                          id="firstName" 
                          placeholder="Il tuo nome" 
                          value={registerFirstName}
                          onChange={(e) => setRegisterFirstName(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Cognome</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Il tuo cognome" 
                          value={registerLastName}
                          onChange={(e) => setRegisterLastName(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registerEmail">Email</Label>
                      <Input 
                        id="registerEmail" 
                        type="email" 
                        placeholder="La tua email" 
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registerPassword">Password</Label>
                      <Input 
                        id="registerPassword" 
                        type="password" 
                        placeholder="Crea una password" 
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Conferma password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="Conferma la password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded border-gray-300 text-mijob-blue focus:ring-mijob-blue"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        Accetto i <a href="/contact#terms" className="text-mijob-blue hover:underline">Termini di Servizio</a> e l'<a href="/contact#privacy" className="text-mijob-blue hover:underline">Informativa sulla Privacy</a>
                      </label>
                    </div>
                    
                    <Button className="w-full bg-mijob-blue hover:bg-mijob-blue/90" type="submit" disabled={loading}>
                      {loading ? "Registrazione in corso..." : "Registrati"}
                    </Button>
                  </form>
                  
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Oppure continua con</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full" type="button">
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" className="w-full" type="button">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Facebook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
