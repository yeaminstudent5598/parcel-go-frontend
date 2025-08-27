// src/pages/Landing/HomePage.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Search, FileText, Package, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import riderImage from '../../assets/images/rider.svg'

const HomePage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <main>
        {/* Hero Section */}
        <section className="bg-slate-50 dark:bg-slate-800 border-b">
          <div className="container mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                Your Parcel, Delivered <span className="text-blue-600 dark:text-blue-400">Faster & Safer</span>.
              </h1>
              <p className="mt-4 max-w-lg mx-auto lg:mx-0 text-lg text-slate-600 dark:text-slate-300">
                Experience the next level of parcel delivery. Fast, reliable, and always on time. Enter your tracking ID to see the magic happen.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:mx-0">
                <Input
                  type="text"
                  placeholder="Enter Your Tracking ID"
                  className="h-12 text-lg flex-grow dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400"
                />
                <Button size="lg" className="h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-base">
                  <Search className="mr-2 h-5 w-5" />
                  Track Parcel
                </Button>
              </div>
            </div>
            {/* Right Column: Image */}
            <div className=" lg:flex justify-center">
              <img src={riderImage} alt="rider" />
            </div>
          </div>
        </section>

        {/* Trust Bar / Stats Section */}
        <section className="py-12 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">1M+</h3>
                <p className="text-slate-500 dark:text-slate-300">Parcels Delivered</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">99.8%</h3>
                <p className="text-slate-500 dark:text-slate-300">On-time Delivery</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">4.8/5</h3>
                <p className="text-slate-500 dark:text-slate-300">Customer Rating</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">64</h3>
                <p className="text-slate-500 dark:text-slate-300">Districts Covered</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-slate-100">It's That Simple</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
              Get your parcel on its way in just three easy steps.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all dark:bg-slate-700 dark:text-slate-100">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 text-blue-600 rounded-xl h-16 w-16 flex items-center justify-center mb-4 dark:bg-blue-900 dark:text-blue-400">
                    <FileText className="h-8 w-8" />
                  </div>
                  <CardTitle>1. Book Your Parcel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">Provide details online and schedule a pickup time that works for you.</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all dark:bg-slate-700 dark:text-slate-100">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 text-blue-600 rounded-xl h-16 w-16 flex items-center justify-center mb-4 dark:bg-blue-900 dark:text-blue-400">
                    <Package className="h-8 w-8" />
                  </div>
                  <CardTitle>2. We Pick It Up</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">Our agent collects the parcel right from your location, hassle-free.</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all dark:bg-slate-700 dark:text-slate-100">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 text-blue-600 rounded-xl h-16 w-16 flex items-center justify-center mb-4 dark:bg-blue-900 dark:text-blue-400">
                    <Truck className="h-8 w-8" />
                  </div>
                  <CardTitle>3. Track & Receive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">Follow your parcel's journey online until it reaches its destination safely.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-blue-600 dark:bg-slate-600 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ship?</h2>
                <p className="text-lg text-blue-200 dark:text-blue-100 max-w-2xl mx-auto mb-8">
                    Create an account today and experience the most seamless delivery service.
                </p>
                 <Button 
        size="lg" 
        variant="secondary" 
        className="bg-white text-blue-600 hover:bg-slate-200 dark:bg-slate-800x` dark:text-blue-400 dark:hover:bg-slate-700"
        onClick={() => navigate('/register')}
    >
        Register for Free
        <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
            </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
