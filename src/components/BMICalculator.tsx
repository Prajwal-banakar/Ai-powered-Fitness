import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Calculator } from 'lucide-react';

interface BMICalculatorProps {
  onDataSaved: () => void;
}

export default function BMICalculator({ onDataSaved }: BMICalculatorProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);

    setBmi(calculatedBMI);

    if (calculatedBMI < 18.5) {
      setCategory('Underweight');
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      setCategory('Normal weight');
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }

    return calculatedBMI;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const calculatedBMI = calculateBMI();

      const { error: insertError } = await supabase
        .from('fitness_data')
        .insert([
          {
            user_id: user?.id,
            height: parseFloat(height),
            weight: parseFloat(weight),
            age: parseInt(age),
            bmi: calculatedBMI,
          },
        ]);

      if (insertError) throw insertError;

      onDataSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Calculator className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">BMI Calculator</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            id="height"
            type="number"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
            min="100"
            max="250"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            id="weight"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
            min="30"
            max="300"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
            min="13"
            max="120"
          />
        </div>

        {bmi !== null && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Your BMI</p>
              <p className="text-3xl font-bold text-blue-600">{bmi.toFixed(1)}</p>
              <p className="text-sm font-medium text-gray-700 mt-2">{category}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Calculating...' : 'Calculate & Save'}
        </button>
      </form>
    </div>
  );
}
