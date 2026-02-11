interface HeroProps {
  heroImage: string;
}

export function Hero({ heroImage }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Food background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Order Your Favorite Food Instantly
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-orange-50">
            Fast delivery • Fresh ingredients • Best prices
          </p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
