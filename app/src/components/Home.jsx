
import { ArrowRight, Bell, Clock, Lock } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col justify-between">
      <header className="py-6 px-4 md:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CryptoAlert</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
            <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 md:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6 animate-pulse">
            Stay Ahead with Crypto Price Alerts
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Get real-time alerts when your favorite cryptocurrencies hit the target price. 
            Simple, fast, and secure.
          </p>
          <a 
            href="/register" 
            className="group bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

        <section id="features" className="py-20 px-4 md:px-8 bg-gray-800">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Our Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Bell size={48} />}
              title="Real-Time Alerts"
              description="Receive instant notifications when your chosen crypto hits the set price."
              gradient="from-green-500 to-blue-500"
            />
            <FeatureCard 
              icon={<Clock size={48} />}
              title="Customizable Alerts"
              description="Set personalized price thresholds for any cryptocurrency of your choice."
              gradient="from-blue-500 to-purple-500"
            />
            <FeatureCard 
              icon={<Lock size={48} />}
              title="Secure & Private"
              description="We prioritize your security, ensuring no sensitive data is shared."
              gradient="from-purple-500 to-pink-500"
            />
          </div>
        </section>

        <section id="contact" className="py-20 px-4 md:px-8 text-center bg-gray-900">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Have questions or need support? We re here to help you stay on top of your crypto investments.
          </p>
          <a 
            href="mailto:tanujchaganti@gmail.com" 
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Contact Us
          </a>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-center">
        <p className="text-gray-400 mb-2">Made with ❤️ by Tanuj</p>
        <p className="text-gray-400">Reach out to us: <a href="mailto:tanujchaganti@gmail.com" className="text-blue-400 hover:underline">tanujchaganti@gmail.com</a></p>
      </footer>
    </div>
  );
};

const FeatureCard = ( icon, title, description, gradient ) => (
  <div className={`flex flex-col items-center p-8 bg-gradient-to-r ${gradient} rounded-lg shadow-lg transition-transform transform hover:scale-105`}>
    <div className="text-white mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
    <p className="text-gray-100 text-center">{description}</p>
  </div>
);

export default Home;