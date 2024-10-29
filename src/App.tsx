import React, { useState, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, MessageCircle, Map, Settings, Shield, LogOut } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import VideoChat from './components/VideoChat';
import Sidebar from './components/Sidebar';
import PreferencesModal from './components/PreferencesModal';
import AuthModal from './components/AuthModal';
import BusinessDashboard from './components/business/BusinessDashboard';
import { UserPreferences, User, AuthState } from './types';

function App() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const savedPrefs = localStorage.getItem('user_preferences');
      return savedPrefs ? JSON.parse(savedPrefs) : {
        maxDistance: 10,
        ageRange: [18, 99],
        interests: [],
      };
    } catch (error) {
      console.error('Error loading preferences:', error);
      return {
        maxDistance: 10,
        ageRange: [18, 99],
        interests: [],
      };
    }
  });

  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const savedAuth = localStorage.getItem('auth_state');
      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        return {
          ...parsedAuth,
          isLoading: false,
        };
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    }
    return {
      isAuthenticated: false,
      user: null,
      isLoading: false,
    };
  });

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    try {
      if (auth.isAuthenticated && auth.user) {
        localStorage.setItem('auth_state', JSON.stringify(auth));
      } else {
        localStorage.removeItem('auth_state');
      }
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  }, [auth]);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('user_preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }, [preferences]);

  const handleAuthSuccess = (userData: { email: string; name: string; type: 'personal' | 'business' }) => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
    };
    
    setAuth({
      isAuthenticated: true,
      user,
      isLoading: false,
    });
    setShowAuth(false);

    if (userData.type === 'personal') {
      setShowPreferences(true);
    }
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
    setShowAuth(true);
  };

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  const renderContent = () => {
    if (!auth.isAuthenticated) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Welcome to VibeLink</h2>
            <p className="text-xl mb-8">Connect with people around you through video chat</p>
            <button
              onClick={() => setShowAuth(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg text-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      );
    }

    if (auth.user?.type === 'business') {
      return <BusinessDashboard userId={auth.user.id} />;
    }

    return (
      <div className="flex-1 flex gap-4">
        <main className="flex-1 bg-black/20 rounded-xl backdrop-blur-sm overflow-hidden relative">
          <VideoChat isActive={isCameraOn} />
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`p-4 rounded-full ${
                isCameraOn ? 'bg-purple-500 hover:bg-purple-600' : 'bg-red-500 hover:bg-red-600'
              } transition-colors`}
            >
              {isCameraOn ? <Video className="w-6 h-6 text-white" /> : <VideoOff className="w-6 h-6 text-white" />}
            </button>
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-4 rounded-full ${
                isMicOn ? 'bg-purple-500 hover:bg-purple-600' : 'bg-red-500 hover:bg-red-600'
              } transition-colors`}
            >
              {isMicOn ? <Mic className="w-6 h-6 text-white" /> : <MicOff className="w-6 h-6 text-white" />}
            </button>
            <button className="p-4 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <button className="p-4 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors">
              <Map className="w-6 h-6 text-white" />
            </button>
          </div>
        </main>

        <Sidebar />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Video className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">VibeLink</h1>
          </div>
          {auth.isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {auth.user?.name}</span>
              {auth.user?.type === 'personal' && (
                <button
                  onClick={() => setShowPreferences(true)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Settings className="w-6 h-6 text-white" />
                </button>
              )}
              <button className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Shield className="w-4 h-4" />
                <span>Premium</span>
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <LogOut className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </header>

        {renderContent()}
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />

      <PreferencesModal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        preferences={preferences}
        onSave={setPreferences}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#4C1D95',
            color: '#fff',
            borderRadius: '0.5rem',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#4C1D95',
            },
          },
        }}
      />
    </div>
  );
}

export default App;