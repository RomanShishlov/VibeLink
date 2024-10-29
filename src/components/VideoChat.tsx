import React from 'react';
import { UserPlus, Timer } from 'lucide-react';

interface VideoChatProps {
  isActive: boolean;
}

const VideoChat: React.FC<VideoChatProps> = ({ isActive }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isActive ? (
        <div className="text-center text-white">
          <UserPlus className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h2 className="text-2xl font-semibold mb-2">Start Meeting New People</h2>
          <p className="text-gray-300">Enable your camera to begin matching with nearby people</p>
        </div>
      ) : (
        <>
          <video
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
          />
          <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full flex items-center space-x-2">
            <Timer className="w-4 h-4 text-white" />
            <span className="text-white text-sm">2:30</span>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoChat;