
const quotes = [
  {
    text: "The only bad workout is the one that didn't happen.",
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    text: 'Success isn’t about greatness. It’s about consistency. Consistent hard work gains success.',
    image: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export default function Inspiration() {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Daily Inspiration</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="relative rounded-xl shadow-lg overflow-hidden h-64 group"
          >
            <img
              src={quote.image}
              alt="Fitness motivation"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <p className="text-white text-xl font-semibold text-center leading-relaxed">
                "{quote.text}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
