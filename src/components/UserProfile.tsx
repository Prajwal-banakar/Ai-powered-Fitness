import { ArrowLeft, User, Mail, Activity, Ruler, Weight } from 'lucide-react';

interface UserProfileProps {
  user: any;
  profile: any;
  fitnessData: any;
  onBack: () => void;
}

export default function UserProfile({ user, profile, fitnessData, onBack }: UserProfileProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors bg-white/50 px-4 py-2 rounded-lg hover:bg-white/80"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <div className="glassmorphism rounded-xl shadow-lg p-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="bg-blue-100 p-6 rounded-full">
              <User className="w-16 h-16 text-blue-600" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900">{profile?.full_name || 'User'}</h2>
              <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2">
                <Mail className="w-4 h-4" />
                {profile?.email || user?.email}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Member since {user?.created_at ? formatDate(user.created_at) : 'N/A'}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Current Fitness Stats</h3>
            {fitnessData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/50 p-6 rounded-xl flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">BMI</p>
                    <p className="text-2xl font-bold text-gray-900">{fitnessData.bmi.toFixed(1)}</p>
                  </div>
                </div>
                <div className="bg-white/50 p-6 rounded-xl flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Weight className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="text-2xl font-bold text-gray-900">{fitnessData.weight} kg</p>
                  </div>
                </div>
                <div className="bg-white/50 p-6 rounded-xl flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Ruler className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="text-2xl font-bold text-gray-900">{fitnessData.height} cm</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                No fitness data available. Go to the dashboard to get started!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
