import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, MapPin, ShieldCheck, Clock, Package2, Users } from 'lucide-react';

const features = [
  {
    icon: <Truck className="h-8 w-8 text-blue-600" />,
    title: "Nationwide Coverage",
    description: "We deliver to all 64 districts of Bangladesh, ensuring your parcel reaches any corner of the country."
  },
  {
    icon: <MapPin className="h-8 w-8 text-blue-600" />,
    title: "Live Parcel Tracking",
    description: "Monitor your parcel's journey in real-time from pickup to delivery with our advanced tracking system."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
    title: "Secure Handling",
    description: "Your trust is our priority. We handle every package with the utmost care and responsibility to prevent any damage."
  },
  {
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    title: "Fastest Delivery",
    description: "With our optimized logistics network, we guarantee the fastest possible delivery times for your parcels."
  },
  {
    icon: <Package2 className="h-8 w-8 text-blue-600" />,
    title: "Easy Booking",
    description: "Create a parcel delivery request in just a few clicks through our user-friendly web application."
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Dedicated Support",
    description: "Our customer support team is always ready to assist you with any queries or issues you may have."
  }
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Features That Set Us Apart
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Discover why thousands of businesses and individuals trust ParcelGo for their delivery needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
