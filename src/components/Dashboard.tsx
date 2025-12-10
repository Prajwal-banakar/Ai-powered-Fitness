import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import BMICalculator from './BMICalculator';
import Chatbot from './Chatbot';
import Inspiration from './Inspiration';
import { LogOut, FileText, Dumbbell, Apple, MapPin } from 'lucide-react'; // Import MapPin
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fitness AI</h1>
              <p className="text-sm text-gray-600">Welcome, {profile?.full_name || 'User'}!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleFindGym}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <MapPin className="w-4 h-4" />
              Find Gym
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!fitnessData ? (
          <div>
            <div className="grid lg:grid-cols-2 gap-8">
              <BMICalculator onDataSaved={loadData} />
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Fitness AI! To get your personalized diet and workout plans, please fill out
                  the BMI calculator form.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg mt-1">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Calculate Your BMI</h3>
                      <p className="text-sm text-gray-600">Enter your height, weight, and age</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-lg mt-1">
                      <Apple className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Get Personalized Plans</h3>
                      <p className="text-sm text-gray-600">Download your diet and workout plans as PDFs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg mt-1">
                      <Dumbbell className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Chat with AI</h3>
                      <p className="text-sm text-gray-600">Get instant answers to your fitness questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Inspiration />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Fitness Profile</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">BMI</p>
                  <p className="text-2xl font-bold text-blue-600">{fitnessData.bmi.toFixed(1)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Weight</p>
                  <p className="text-2xl font-bold text-green-600">{fitnessData.weight} kg</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Height</p>
                  <p className="text-2xl font-bold text-purple-600">{fitnessData.height} cm</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Age</p>
                  <p className="text-2xl font-bold text-orange-600">{fitnessData.age} years</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Apple className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Diet Plan</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Get your personalized diet plan based on your BMI and fitness goals. Includes meal
                  plans, calorie targets, and nutritional guidelines.
                </p>
                <button
                  onClick={handleDownloadDietPlan}
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Download Diet Plan
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Dumbbell className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Workout Plan</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Get your personalized workout plan tailored to your fitness level. Includes weekly
                  schedules, exercises, and progression guidelines.
                </p>
                <button
                  onClick={handleDownloadWorkoutPlan}
                  className="w-full bg-orange-600 text-white py-2.5 rounded-lg font-medium hover:bg-orange-700 transition flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Download Workout Plan
                </button>
              </div>
            </div>

            <Chatbot />

            <Inspiration />

            <div className="text-center">
              <button
                onClick={() => setFitnessData(null)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Update Your Fitness Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
