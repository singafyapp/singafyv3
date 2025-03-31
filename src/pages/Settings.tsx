
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>
      
      <div className="space-y-6">
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Language Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Learning Language</p>
                <p className="text-sm text-muted-foreground">Select your target language</p>
              </div>
              <Select defaultValue="spanish">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="french">🇫🇷 French</SelectItem>
                  <SelectItem value="german">🇩🇪 German</SelectItem>
                  <SelectItem value="italian">🇮🇹 Italian</SelectItem>
                  <SelectItem value="portuguese">🇵🇹 Portuguese</SelectItem>
                  <SelectItem value="japanese">🇯🇵 Japanese</SelectItem>
                  <SelectItem value="korean">🇰🇷 Korean</SelectItem>
                  <SelectItem value="chinese">🇨🇳 Chinese (Mandarin)</SelectItem>
                  <SelectItem value="russian">🇷🇺 Russian</SelectItem>
                  <SelectItem value="arabic">🇦🇪 Arabic</SelectItem>
                  <SelectItem value="dutch">🇳🇱 Dutch</SelectItem>
                  <SelectItem value="swedish">🇸🇪 Swedish</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Native Language</p>
                <p className="text-sm text-muted-foreground">Select your native language</p>
              </div>
              <Select defaultValue="english">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">🇬🇧 English</SelectItem>
                  <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="french">🇫🇷 French</SelectItem>
                  <SelectItem value="german">🇩🇪 German</SelectItem>
                  <SelectItem value="italian">🇮🇹 Italian</SelectItem>
                  <SelectItem value="portuguese">🇵🇹 Portuguese</SelectItem>
                  <SelectItem value="japanese">🇯🇵 Japanese</SelectItem>
                  <SelectItem value="korean">🇰🇷 Korean</SelectItem>
                  <SelectItem value="chinese">🇨🇳 Chinese (Mandarin)</SelectItem>
                  <SelectItem value="russian">🇷🇺 Russian</SelectItem>
                  <SelectItem value="arabic">🇦🇪 Arabic</SelectItem>
                  <SelectItem value="dutch">🇳🇱 Dutch</SelectItem>
                  <SelectItem value="swedish">🇸🇪 Swedish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">App Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Reminders</p>
                <p className="text-sm text-muted-foreground">Get notifications to maintain your streak</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Music Player</p>
                <p className="text-sm text-muted-foreground">Show music player while learning</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Spotify API Status</p>
                <p className="text-sm text-muted-foreground">App-wide Spotify integration status</p>
              </div>
              <div className="flex items-center">
                <Music className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-green-500">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
