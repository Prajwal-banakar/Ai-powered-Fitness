import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Calculator, CheckCircle2 } from 'lucide-react';

interface BMICalculatorProps {
  onDataSaved: () => void;
}

export default function BMICalculator({ onDataSaved }: BMICalculatorProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const calculateBmi = () => {
    setError('');
    setSuccess(false);
    if (!height || !weight || !age) {
      setError('Please enter all fields.');
      return;
    }

    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    if (isNaN(h) || isNaN(w) || isNaN(a) || h <= 0 || w <= 0 || a <= 0) {
      setError('Please enter valid positive numbers for height, weight, and age.');
      return;
    }

    const bmiValue = w / ((h / 100) * (h / 100));
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  const saveData = async () => {
    if (!bmi || !user) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.from('fitness_data').insert([
        {
          user_id: user.id,
          height: parseFloat(height),
          weight: parseFloat(weight),
          age: parseInt(age),
          bmi: bmi,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      onDataSaved(); // Notify parent to reload data
    } catch (err) {
      console.error('Error saving fitness data:', err);
      setError(err instanceof Error ? err.message : 'Failed to save data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glassmorphism rounded-xl shadow-lg p-6 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Calculator className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">BMI Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-white/70"
            placeholder="e.g., 175"
            min="1"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-white/70"
            placeholder="e.g., 70"
            min="1"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age (years)
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-white/70"
            placeholder="e.g., 30"
            min="1"
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-300">
            {error}
          </div>
        )}

        <button
          onClick={calculateBmi}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          disabled={loading}
        >
          Calculate BMI
        </button>
      </div>

      {bmi && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center animate-fadeIn">
          <p className="text-lg font-semibold text-gray-800">Your BMI: <span className="text-blue-600">{bmi.toFixed(2)}</span></p>
          <p className="text-md text-gray-700">Category: <span className="font-medium">{category}</span></p>
          <button
            onClick={saveData}
            className="mt-4 w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              'Saving...'
            ) : success ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Saved!
              </>
            ) : (
              'Save Data'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
