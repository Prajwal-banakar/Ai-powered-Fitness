import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import BMICalculator from './BMICalculator';
import Chatbot from './Chatbot';
import Inspiration from './Inspiration';
import GettingStarted from './GettingStarted';
import { LogOut, FileText, Dumbbell, Apple, MapPin, Wind, RefreshCw } from 'lucide-react';
import { generateDietPlan, generateWorkoutPlan } from '../utils/planGenerator';
import { generatePDF } from '../utils/pdfGenerator';

interface FitnessData {
  id: string;
  height: number;
  weight: number;
  age: number;
  bmi: number;
  created_at: string;
}

interface Profile {
  full_name: string;
  email: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fitnessData, setFitnessData] = useState<FitnessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top with a small delay
    setTimeout(() => window.scrollTo(0, 0), 100);
  }, [fitnessData]);

  const loadData = async () => {
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', user?.id)
        .maybeSingle();

      setProfile(profileData);

      const { data: fitness } = await supabase
        .from('fitness_data')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      setFitnessData(fitness);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleDownloadDietPlan = () => {
    if (!fitnessData) return;
    const plan = generateDietPlan(fitnessData);
    generatePDF(plan, 'Personalized Diet Plan', profile?.full_name || 'User');
  };

  const handleDownloadWorkoutPlan = () => {
    if (!fitnessData) return;
    const plan = generateWorkoutPlan(fitnessData);
    generatePDF(plan, 'Personalized Workout Plan', profile?.full_name || 'User');
  };

  const handleFindGym = () => {
    window.open('https://www.google.com/maps/search/gyms+near+me', '_blank');
  };

  const handleFindYoga = () => {
    window.open('https://www.google.com/maps/search/yoga+classes+near+me', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Dumbbell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">AI Powered Fitness</h1>
              <p className="text-xs md:text-sm text-gray-700">Welcome, {profile?.full_name || 'User'}!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={handleFindGym}
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden md:inline">Find Gym</span>
            </button>
            <button
              onClick={handleFindYoga}
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
            >
              <Wind className="w-4 h-4" />
              <span className="hidden md:inline">Find Yoga</span>
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!fitnessData ? (
          <div className="space-y-8">
            <GettingStarted />
            <BMICalculator onDataSaved={loadData} />
            <Inspiration />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="glassmorphism rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Fitness Profile</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/50 p-4 rounded-lg text-center transition-transform transform hover:scale-105">
                  <p className="text-sm text-gray-700 mb-1">BMI</p>
                  <p className="text-2xl font-bold text-blue-600">{fitnessData.bmi.toFixed(1)}</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center transition-transform transform hover:scale-105">
                  <p className="text-sm text-gray-700 mb-1">Weight</p>
                  <p className="text-2xl font-bold text-green-600">{fitnessData.weight} kg</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center transition-transform transform hover:scale-105">
                  <p className="text-sm text-gray-700 mb-1">Height</p>
                  <p className="text-2xl font-bold text-purple-600">{fitnessData.height} cm</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center transition-transform transform hover:scale-105">
                  <p className="text-sm text-gray-700 mb-1">Age</p>
                  <p className="text-2xl font-bold text-orange-600">{fitnessData.age} years</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glassmorphism rounded-xl shadow-lg overflow-hidden group h-full flex flex-col bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                <div className="relative p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-100 p-3 rounded-lg shadow-md">
                      <Apple className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Diet Plan</h3>
                  </div>
                  <p className="text-gray-700 text-lg mb-8 flex-1 leading-relaxed">
                    Unlock a healthier you with a diet plan tailored to your unique needs. Our AI analyzes your fitness data to create a balanced and effective meal plan.
                  </p>
                  <button
                    onClick={handleDownloadDietPlan}
                    className="w-full bg-green-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                  >
                    <FileText className="w-6 h-6" />
                    Download Diet Plan
                  </button>
                </div>
              </div>

              <div className="glassmorphism rounded-xl shadow-lg overflow-hidden group h-full flex flex-col bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
                <div className="relative p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-orange-100 p-3 rounded-lg shadow-md">
                      <Dumbbell className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Workout Plan</h3>
                  </div>
                  <p className="text-gray-700 text-lg mb-8 flex-1 leading-relaxed">
                    Get ready to sweat with a workout plan designed just for you. Our AI crafts a routine that matches your fitness level and goals.
                  </p>
                  <button
                    onClick={handleDownloadWorkoutPlan}
                    className="w-full bg-orange-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-orange-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                  >
                    <FileText className="w-6 h-6" />
                    Download Workout Plan
                  </button>
                </div>
              </div>
            </div>

            <Chatbot />

            <div className="text-center pt-4">
              <button
                onClick={() => setFitnessData(null)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" />
                Update Your Fitness Data
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
