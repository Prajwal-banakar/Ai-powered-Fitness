interface FitnessData {
  bmi: number;
  age: number;
  weight: number;
  height: number;
}

export function generateDietPlan(data: FitnessData): string {
  const { bmi, age, weight } = data;
  let category = '';
  let dailyCalories = 0;

  if (bmi < 18.5) {
    category = 'Underweight';
    dailyCalories = Math.round(weight * 35);
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
    dailyCalories = Math.round(weight * 30);
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    dailyCalories = Math.round(weight * 25);
  } else {
    category = 'Obese';
    dailyCalories = Math.round(weight * 22);
  }

  const protein = Math.round(weight * 1.6);
  const carbs = Math.round((dailyCalories * 0.4) / 4);
  const fats = Math.round((dailyCalories * 0.3) / 9);

  return `PERSONALIZED DIET PLAN

PROFILE SUMMARY
BMI: ${bmi.toFixed(1)} (${category})
Age: ${age} years
Current Weight: ${weight} kg

DAILY NUTRITIONAL TARGETS
• Total Calories: ${dailyCalories} kcal
• Protein: ${protein}g
• Carbohydrates: ${carbs}g
• Fats: ${fats}g
• Water: 2-3 liters

MEAL PLAN

BREAKFAST (7:00 AM - 8:00 AM)
• Oatmeal with mixed berries (1 cup)
• Greek yogurt (200g)
• Banana (1 medium)
• Green tea or black coffee
Calories: ~${Math.round(dailyCalories * 0.25)} kcal

MID-MORNING SNACK (10:30 AM)
• Mixed nuts (30g)
• Apple or orange (1 medium)
Calories: ~${Math.round(dailyCalories * 0.10)} kcal

LUNCH (12:30 PM - 1:30 PM)
• Grilled chicken breast (150g) or fish
• Brown rice or quinoa (1 cup cooked)
• Mixed vegetables salad
• Olive oil dressing (1 tbsp)
Calories: ~${Math.round(dailyCalories * 0.35)} kcal

AFTERNOON SNACK (4:00 PM)
• Protein shake or smoothie
• Whole grain crackers (4-5 pieces)
Calories: ~${Math.round(dailyCalories * 0.10)} kcal

DINNER (7:00 PM - 8:00 PM)
• Lean protein (chicken, fish, tofu) 150g
• Sweet potato or whole grain pasta (1 cup)
• Steamed vegetables
• Mixed green salad
Calories: ~${Math.round(dailyCalories * 0.20)} kcal

FOOD GUIDELINES
✓ Prioritize whole, unprocessed foods
✓ Eat lean proteins with every meal
✓ Include colorful vegetables
✓ Choose complex carbohydrates
✓ Stay hydrated throughout the day
✓ Limit processed foods and added sugars
✓ Eat mindfully and avoid distractions

SUPPLEMENTS (Optional)
• Multivitamin
• Omega-3 fatty acids
• Vitamin D3
• Probiotics

NOTES
• Adjust portions based on hunger and activity level
• Meal prep on weekends for convenience
• Listen to your body's hunger cues
• Consult a nutritionist for personalized advice

This plan is generated based on your current metrics and general guidelines.
For optimal results, consider consulting with a certified nutritionist.`;
}

export function generateWorkoutPlan(data: FitnessData): string {
  const { bmi, age } = data;
  let category = '';
  let intensity = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    intensity = 'Moderate';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
    intensity = 'Moderate to High';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    intensity = 'Moderate';
  } else {
    category = 'Obese';
    intensity = 'Low to Moderate';
  }

  const cardioMinutes = bmi >= 25 ? 45 : 30;

  return `PERSONALIZED WORKOUT PLAN

PROFILE SUMMARY
BMI: ${bmi.toFixed(1)} (${category})
Age: ${age} years
Recommended Intensity: ${intensity}

WEEKLY WORKOUT SCHEDULE

MONDAY - Upper Body Strength
Warm-up (10 minutes)
• Light jogging or cycling
• Dynamic stretches

Main Workout (40 minutes)
1. Push-ups: 3 sets × 12 reps
2. Dumbbell Rows: 3 sets × 12 reps
3. Shoulder Press: 3 sets × 10 reps
4. Bicep Curls: 3 sets × 12 reps
5. Tricep Dips: 3 sets × 10 reps
6. Plank: 3 sets × 30-60 seconds

Cool-down (10 minutes)
• Static stretching

TUESDAY - Cardio & Core
Warm-up (5 minutes)
• Light jogging

Main Workout (${cardioMinutes} minutes)
1. Brisk walking or jogging: ${cardioMinutes} minutes
2. Mountain Climbers: 3 sets × 20 reps
3. Bicycle Crunches: 3 sets × 20 reps
4. Russian Twists: 3 sets × 30 reps
5. Leg Raises: 3 sets × 15 reps

Cool-down (5 minutes)
• Walking and stretching

WEDNESDAY - Rest or Active Recovery
• Light yoga or stretching
• Walking (20-30 minutes)
• Foam rolling

THURSDAY - Lower Body Strength
Warm-up (10 minutes)
• Light cardio and leg swings

Main Workout (40 minutes)
1. Squats: 3 sets × 15 reps
2. Lunges: 3 sets × 12 reps per leg
3. Deadlifts: 3 sets × 12 reps
4. Calf Raises: 3 sets × 20 reps
5. Glute Bridges: 3 sets × 15 reps
6. Wall Sit: 3 sets × 45 seconds

Cool-down (10 minutes)
• Lower body stretching

FRIDAY - Full Body Circuit
Warm-up (5 minutes)
• Jumping jacks and dynamic stretches

Circuit (Repeat 3 times, 45 minutes total)
1. Burpees: 10 reps
2. Kettlebell Swings: 15 reps
3. Jump Squats: 12 reps
4. Push-ups: 12 reps
5. High Knees: 30 seconds
6. Plank to Downward Dog: 10 reps
Rest: 2 minutes between circuits

Cool-down (5 minutes)
• Full body stretching

SATURDAY - Cardio Endurance
• Running, cycling, or swimming: ${cardioMinutes + 15} minutes
• Interval training optional
• Steady pace or HIIT based on fitness level

SUNDAY - Rest Day
• Complete rest or gentle yoga
• Focus on recovery and meal prep

EXERCISE TIPS
✓ Start with lighter weights and progress gradually
✓ Focus on proper form over speed
✓ Rest 60-90 seconds between sets
✓ Stay hydrated during workouts
✓ Listen to your body and avoid overtraining
✓ Warm up before and cool down after every session

PROGRESSION GUIDELINES
• Week 1-2: Learn proper form, lighter weights
• Week 3-4: Increase weights by 5-10%
• Week 5+: Progressive overload, add variety

SAFETY NOTES
• Consult a doctor before starting any new exercise program
• Stop immediately if you feel pain or discomfort
• Modify exercises based on your fitness level
• Consider working with a personal trainer initially

This plan is tailored to your current fitness level and goals.
Adjust intensity and volume based on your progress and how you feel.`;
}
