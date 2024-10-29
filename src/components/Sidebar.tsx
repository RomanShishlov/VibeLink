import React from 'react';
import { MessageSquare, Users, Award } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-80 bg-white/10 rounded-xl backdrop-blur-sm p-4 text-white">
      <div className="space-y-6">
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="flex items-center space-x-2 font-semibold mb-4">
            <Users className="w-5 h-5" />
            <span>Nearby Users</span>
          </h3>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                <div>
                  <p className="font-medium">User {i + 1}</p>
                  <p className="text-sm text-gray-300">2.{i + 1} km away</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="flex items-center space-x-2 font-semibold mb-4">
            <MessageSquare className="w-5 h-5" />
            <span>Recent Chats</span>
          </h3>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-green-400" />
                <div>
                  <p className="font-medium">Chat {i + 1}</p>
                  <p className="text-sm text-gray-300">Hey, how's it going?</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="flex items-center space-x-2 font-semibold mb-4">
            <Award className="w-5 h-5" />
            <span>Your Stats</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-gray-300">Matches</p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-gray-300">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;