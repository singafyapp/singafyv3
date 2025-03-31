
import { Song } from "@/types";
import { toast } from "@/hooks/use-toast";

// Local storage key for favorites
const FAVORITES_KEY = "singafy_favorites";

// Get all favorite songs
export const getFavorites = (): Song[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

// Save a song to favorites
export const saveFavorite = (song: Song): void => {
  try {
    const favorites = getFavorites();
    
    // Check if the song is already in favorites to avoid duplicates
    const existingIndex = favorites.findIndex(fav => fav.id === song.id);
    
    if (existingIndex !== -1) {
      // Already exists - don't add duplicate
      return;
    }
    
    // Add the new favorite
    favorites.push(song);
    
    // Save back to local storage
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorite:", error);
    toast({
      title: "Error",
      description: "Failed to save favorite song",
      variant: "destructive",
    });
    throw error;
  }
};

// Remove a song from favorites
export const removeFavorite = (songId: string): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(song => song.id !== songId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing favorite:", error);
    toast({
      title: "Error",
      description: "Failed to remove favorite song",
      variant: "destructive",
    });
    throw error;
  }
};

// Check if a song is in favorites
export const isFavorite = (songId: string): boolean => {
  const favorites = getFavorites();
  return favorites.some(song => song.id === songId);
};
