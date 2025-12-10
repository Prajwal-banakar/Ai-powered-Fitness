import { FileText, Dumbbell, Apple, MapPin, Wind, MessageCircle } from 'lucide-react';

const features = [
  {
    title: 'Calculate Your BMI',
    description: 'Get a baseline for your fitness journey. Enter your height, weight, and age, and we’ll calculate your Body Mass Index to help you understand your starting point.',
    icon: FileText,
    color: 'blue',
    image: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Get Personalized Plans',
    description: 'Based on your BMI, we generate personalized diet and workout plans. These downloadable PDF guides are tailored to help you reach your specific goals efficiently.',
    icon: Apple,
    color: 'green',
    image: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Chat with AI',
    description: 'Have a question? Our powerful AI assistant is available 24/7 to provide instant, informative answers on a wide range of topics, from fitness to general knowledge.',
    icon: MessageCircle,
    color: 'purple',
    image: 'https://images.pexels.com/photos/8938929/pexels-photo-8938929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Find a Gym or Yoga Class',
    description: 'Discover fitness locations near you. Whether you’re looking for a high-energy gym or a calming yoga studio, our map feature will help you find the perfect spot.',
    icon: MapPin,
    color: 'orange',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export default function GettingStarted() {
  return (
    <div className="glassmorphism rounded-xl shadow-lg p-6 md:p-8 animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Welcome to AI Powered Fitness</h2>
      <p className="text-center text-gray-700 mb-10 md:mb-12 max-w-3xl mx-auto text-lg">
        Your all-in-one platform to kickstart and maintain your fitness journey. Here’s how you can get the most out of our features.
      </p>
      <div className="space-y-12 md:space-y-16">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex flex-col md:flex-row gap-6 md:gap-10 items-center ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <div className={`bg-${feature.color}-100 p-3 rounded-lg shadow-md`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">{feature.description}</p>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src={feature.image}
                alt={feature.title}
                className="rounded-xl shadow-lg object-cover h-48 md:h-56 w-full transition-transform transform hover:scale-105 duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
