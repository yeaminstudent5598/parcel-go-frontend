import { Helmet } from 'react-helmet-async';
import { ShieldCheck, FileText, Scale, Lock } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20">
      <Helmet><title>Terms of Service | ParcelGo</title></Helmet>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <FileText className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-4xl font-black mb-4">Terms of <span className="text-blue-600">Service</span></h1>
          <p className="text-slate-500">Last updated: December 2025</p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Scale size={20} className="text-blue-600" /> 1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By accessing and using ParcelGo services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-600" /> 2. User Responsibilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Users must provide accurate information when booking shipments. Prohibited items including illegal substances, hazardous materials, and fragile items without proper declaration are not allowed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock size={20} className="text-blue-600" /> 3. Payment & Refunds
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              All delivery charges must be paid upfront or via COD as per business agreements. Refunds are processed within 7 business days for canceled shipments that have not left the sorting hub.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;