import React, { useState, useEffect } from 'react';
import { Building2, Tag, Settings, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import BusinessProfile from './BusinessProfile';
import DealsList from './DealsList';
import NewDealModal from './NewDealModal';
import { BusinessProfile as TBusinessProfile, Deal } from '../../types';

interface BusinessDashboardProps {
  userId: string;
}

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'deals'>('profile');
  const [showNewDealModal, setShowNewDealModal] = useState(false);
  const [profile, setProfile] = useState<TBusinessProfile>(() => {
    try {
      const savedProfile = localStorage.getItem(`business_profile_${userId}`);
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        if (parsedProfile.userId === userId) {
          return parsedProfile;
        }
      }
    } catch (error) {
      console.error('Error loading business profile:', error);
    }
    
    // Return default profile if no saved profile exists or if userId doesn't match
    return {
      id: userId,
      userId,
      businessName: '',
      description: '',
      category: '',
      address: '',
      phone: '',
      photos: [],
      socialLinks: {},
      operatingHours: {},
    };
  });
  
  const [deals, setDeals] = useState<Deal[]>(() => {
    try {
      const savedDeals = localStorage.getItem(`business_deals_${userId}`);
      return savedDeals ? JSON.parse(savedDeals) : [];
    } catch (error) {
      console.error('Error loading deals:', error);
      return [];
    }
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(`business_profile_${userId}`, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving business profile:', error);
    }
  }, [profile, userId]);

  // Save deals to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(`business_deals_${userId}`, JSON.stringify(deals));
    } catch (error) {
      console.error('Error saving deals:', error);
    }
  }, [deals, userId]);

  const handleProfileUpdate = (updatedProfile: TBusinessProfile) => {
    setProfile(updatedProfile);
    toast.success('Business profile saved successfully!');
  };

  const handleDealCreate = (newDeal: Omit<Deal, 'id' | 'businessId'>) => {
    const deal: Deal = {
      id: Math.random().toString(36).substr(2, 9),
      businessId: profile.id,
      ...newDeal,
    };
    setDeals([...deals, deal]);
    setShowNewDealModal(false);
    toast.success('New deal created successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b">
          <nav className="flex space-x-4 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'profile'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building2 className="w-5 h-5 inline-block mr-2" />
              Business Profile
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className={`px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'deals'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Tag className="w-5 h-5 inline-block mr-2" />
              Deals & Promotions
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' ? (
            <BusinessProfile profile={profile} onUpdate={handleProfileUpdate} />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Deals & Promotions</h2>
                <button
                  onClick={() => setShowNewDealModal(true)}
                  className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>New Deal</span>
                </button>
              </div>
              <DealsList deals={deals} />
            </div>
          )}
        </div>
      </div>

      <NewDealModal
        isOpen={showNewDealModal}
        onClose={() => setShowNewDealModal(false)}
        onSubmit={handleDealCreate}
      />
    </div>
  );
};

export default BusinessDashboard;