
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Music, Languages, Sparkles } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-spotify-black">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Hero Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8 md:p-12 flex items-center justify-center">
          <div className="max-w-xl">
            <div className="flex items-center mb-6">
              <Sparkles className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-4xl font-bold tracking-tight text-white">Singafy</h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Learn languages through music, naturally.
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Discover a new way to learn languages by listening to your favorite songs and understanding their lyrics.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-start mb-2">
                  <Music className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <h3 className="font-medium text-white">Music Integration</h3>
                </div>
                <p className="text-sm text-white/70">
                  Learn from popular songs in your target language with real-world context.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-start mb-2">
                  <Languages className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <h3 className="font-medium text-white">Multiple Languages</h3>
                </div>
                <p className="text-sm text-white/70">
                  Spanish, French, German, Italian and more languages to discover.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome to Singafy</h2>
              <p className="text-muted-foreground">Sign in or create an account to get started</p>
            </div>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      placeholder="hello@example.com" 
                      type="email" 
                      required
                      className="bg-spotify-lightgray border-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      required
                      className="bg-spotify-lightgray border-white/5"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-spotify-black px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" className="border-white/10">
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="border-white/10">
                      Spotify
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              {/* Register Form */}
              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required
                      className="bg-spotify-lightgray border-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input 
                      id="email-register" 
                      placeholder="hello@example.com" 
                      type="email" 
                      required
                      className="bg-spotify-lightgray border-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register">Password</Label>
                    <Input 
                      id="password-register" 
                      type="password" 
                      required
                      className="bg-spotify-lightgray border-white/5"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-spotify-black px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" className="border-white/10">
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="border-white/10">
                      Spotify
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            
            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
