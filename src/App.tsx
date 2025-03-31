
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import LyricLearning from "./pages/LyricLearning";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Songs from "./pages/Songs";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import WordFocus from "./pages/WordFocus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/lyric-learning" element={<LyricLearning />} />
              <Route path="/songs" element={<Songs />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/word-focus" element={<WordFocus />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
