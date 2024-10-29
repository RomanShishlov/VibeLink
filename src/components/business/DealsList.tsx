import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Deal } from '../../types';

interface DealsListProps {
  deals: Deal[];
}

const DealsList: React.FC<DealsListProps> = ({ deals }) => {
  if (deals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No deals or promotions yet. Create your first deal!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {deals.map((deal) => (
        <div key={deal.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
          {deal.imageUrl && (
            <img
              src={deal.imageUrl}
              alt={deal.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{deal.title}</h3>
            <p className="text-gray-600 mb-4">{deal.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(deal.startDate).toLocaleDateString()} - {new Date(deal.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{deal.discount} OFF</span>
              </div>
            </div>
            {deal.terms && (
              <p className="mt-4 text-xs text-gray-500">
                Terms: {deal.terms}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DealsList;