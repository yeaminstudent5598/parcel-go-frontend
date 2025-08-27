import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rocket, ShieldCheck, HeartHandshake, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white text-slate-800">
      {/* 1. Improved Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('/path-to-your-subtle-pattern.svg')]" />
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg leading-tight">
            Connecting Bangladesh, <br className="hidden md:inline"/>One Parcel at a Time.
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-blue-100 drop-shadow-md">
            We are ParcelGo, a team of passionate individuals dedicated to revolutionizing the logistics industry in Bangladesh with speed, reliability, and care.
          </p>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Story</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                ParcelGo was founded in 2023 with a simple mission: to make parcel delivery easier, faster, and more transparent for everyone. We saw the challenges faced by small businesses and individuals in sending and receiving goods across the country and knew there had to be a better way.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Leveraging cutting-edge technology and a customer-first approach, we built a platform that not only ensures timely delivery but also provides peace of mind through real-time tracking and dedicated support. Today, we are proud to serve thousands of happy customers across all 64 districts.
              </p>
            </div>
            <div className="hidden lg:flex justify-center items-center">
                
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                <Rocket className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Speed</h3>
              <p className="text-slate-600">We prioritize efficiency to ensure your parcels reach their destination in the shortest possible time.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-slate-600">Your trust is our biggest asset. We handle every package with the utmost care and responsibility.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                <HeartHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-slate-600">We are committed to providing exceptional service and support to meet your needs.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Teamwork</h3>
              <p className="text-slate-600">Our success is driven by the collaborative spirit of our dedicated team across the nation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Meet the Team Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">Jane Doe</h3>
                <p className="text-blue-600">Founder & CEO</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">John Smith</h3>
                <p className="text-blue-600">Head of Operations</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">Aisha Khan</h3>
                <p className="text-blue-600">Technology Lead</p>
              </CardContent>
            </Card>
             <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a048581f4e29026701d" />
                  <AvatarFallback>RH</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">Rahim Hasan</h3>
                <p className="text-blue-600">Customer Support Head</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;