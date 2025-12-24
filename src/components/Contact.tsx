import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

interface ContactProps {
  onBack: () => void;
}

export default function Contact({ onBack }: ContactProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors bg-white/50 px-4 py-2 rounded-lg hover:bg-white/80"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <div className="max-w-2xl mx-auto glassmorphism rounded-xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg transition-transform hover:scale-105">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-medium text-gray-900">support@aifitness.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg transition-transform hover:scale-105">
              <div className="bg-green-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-lg font-medium text-gray-900">+91 8310484117</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg transition-transform hover:scale-105">
              <div className="bg-purple-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-lg font-medium text-gray-900">Ramanagara, Karnataka, India, 562159</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <a
              href="https://github.com/Prajwal-banakar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-3 rounded-full text-white hover:bg-gray-900 transition-transform hover:scale-110 shadow-md"
              title="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/prajwal-banakar/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 p-3 rounded-full text-white hover:bg-blue-800 transition-transform hover:scale-110 shadow-md"
              title="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:prajwal.banakara@gmail.com"
              className="bg-red-600 p-3 rounded-full text-white hover:bg-red-700 transition-transform hover:scale-110 shadow-md"
              title="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600">
              We are available Monday to Friday, 9am to 5pm EST.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
