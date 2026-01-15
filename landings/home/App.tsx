import React from 'react';

interface LandingCard {
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
}

const App: React.FC = () => {
  const landings: LandingCard[] = [
    {
      title: 'Super Pack Saludable',
      description: 'Mega pack de nutrición con +1000 recetas, guías de detox, airfryer saludable y mucho más.',
      image: '/superpack-saludable/images/img1.webp',
      href: '/superpack-saludable/',
      badge: 'NUEVO'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
          Educadox
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-medium">
          Recursos digitales para transformar tu vida
        </p>
      </header>

      {/* Landing Cards Grid */}
      <main className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          Nuestros Productos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {landings.map((landing, index) => (
            <a
              key={index}
              href={landing.href}
              className="group block w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={landing.image}
                  alt={landing.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {landing.badge && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {landing.badge}
                  </span>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white font-bold text-lg flex items-center gap-2">
                    Ver más
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {landing.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {landing.description}
                </p>
              </div>
            </a>
          ))}

          {/* Placeholder Card for Future Landings */}
          <div className="w-full max-w-sm bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-dashed border-white/40 flex items-center justify-center aspect-[4/5]">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-white/80 font-medium">Próximamente</p>
              <p className="text-white/60 text-sm mt-1">Más recursos en camino</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-20 text-white/70 text-sm">
        <p>&copy; {new Date().getFullYear()} Educadox. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
