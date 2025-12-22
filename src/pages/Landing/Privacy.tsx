import { Helmet } from 'react-helmet-async';
import { Eye, ShieldAlert, Database, UserCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20">
      <Helmet><title>Privacy Policy | ParcelGo</title></Helmet>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <ShieldAlert className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-4xl font-black mb-4">Privacy <span className="text-blue-600">Policy</span></h1>
          <p className="text-slate-500">How we protect your data</p>
        </div>

        <div className="space-y-12">
          <section className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-600">
              <Database size={20} /> Data Collection
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We collect minimal personal information such as name, email, phone number, and delivery address to facilitate your logistics needs. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-600">
              <Eye size={20} /> GPS Tracking Data
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              To provide real-time updates, we process location data from our riders. This information is only shared with the sender and receiver of the specific parcel.
            </p>
          </section>

          <section className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-600">
              <UserCheck size={20} /> Your Rights
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You have the right to request deletion of your account and personal data at any time through our support portal or profile settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;