import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';
import { User } from '@/types';

// Initialize Supabase client
// Using placeholder values that will work with the client library
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

// Auth functions
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    toast({
      title: "Account created",
      description: "Please check your email to verify your account",
    });

    return data;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Something went wrong",
      variant: "destructive",
    });
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    toast({
      title: "Welcome back!",
      description: "You've successfully signed in",
    });

    return data;
  } catch (error: any) {
    toast({
      title: "Sign in failed",
      description: error.message || "Invalid credentials",
      variant: "destructive",
    });
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    toast({
      title: "Error",
      description: "Failed to sign out",
      variant: "destructive",
    });
    return false;
  }

  toast({
    title: "Signed out",
    description: "You've been signed out successfully",
  });
  return true;
}

// User functions
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return null;
    
    // Fetch user profile from your profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (error) throw error;
    
    return {
      id: session.user.id,
      email: session.user.email || '',
      name: data.name || session.user.email?.split('@')[0] || 'User',
      avatar: data.avatar_url,
      currentLanguage: data.current_language,
      streak: data.streak,
      xp: data.xp,
      level: data.level,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Export the supabase client for direct usage
export { supabase };
