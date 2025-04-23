import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Gradient */}
        <section className="bg-gradient-to-br from-mijob-blue via-blue-500 to-mijob-lavender text-white py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(60deg,_#abecd6_0%,_#fbed96_100%)] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Hai un'ora libera?<br />
                <span className="text-white/90">Falla fruttare.</span>
              </h1>
              <p className="mt-6 text-xl text-white/80 max-w-2xl mx-auto animate-fade-in delay-100">
                Trova lavoretti flessibili che si adattano al tuo orario universitario e alle tue esigenze. MiJob crea un calendario personalizzato in base a disponibilità, preferenze e obiettivi.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in delay-200">
                <Link to="/calendar">
                  <Button size="lg" className="bg-mijob-orange hover:bg-mijob-orange/90 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Sparkles className="mr-2" />
                    Crea il Tuo Calendario!
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg">
                    Esplora offerte
                  </Button>
                </Link>
              </div>
              
              {/* Stats Section */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-white/80 mt-2">Studenti Attivi</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-white">€15/h</div>
                  <div className="text-white/80 mt-2">Media Guadagno</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-white">1000+</div>
                  <div className="text-white/80 mt-2">Offerte Disponibili</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Come funziona</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                MiJob semplifica la tua vita da studente combinando flessibilità e guadagno in tre semplici passaggi.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-mijob-blue/10 text-mijob-blue rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Imposta le tue preferenze</h3>
                <p className="text-gray-600">
                  Indica la tua disponibilità, le categorie di lavoro preferite e quanto vorresti guadagnare.
                </p>
              </div>
              <div className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-mijob-orange/10 text-mijob-orange rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Ricevi il tuo calendario</h3>
                <p className="text-gray-600">
                  MiJob crea un calendario personalizzato di lavoretti flessibili che rispetta le tue esigenze.
                </p>
              </div>
              <div className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-mijob-lavender/10 text-mijob-lavender rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Lavora e guadagna</h3>
                <p className="text-gray-600">
                  Lavora nelle ore che hai scelto, accumula esperienza e raggiungi i tuoi obiettivi economici.
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link to="/calendar">
                <Button className="bg-mijob-blue hover:bg-mijob-blue/90 text-white px-8">
                  Crea il Tuo Calendario!
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-mijob-blue to-mijob-lavender bg-clip-text text-transparent">
                Perché scegliere MiJob?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                La piattaforma ideale per studenti che vogliono guadagnare senza compromettere lo studio.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-mijob-blue/10 text-mijob-blue rounded-full flex items-center justify-center mb-4">
                  <Sparkles />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flessibilità totale</h3>
                <p className="text-gray-600">Lavora solo quando sei disponibile, adattando gli impegni allo studio.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-mijob-orange/10 text-mijob-orange rounded-full flex items-center justify-center mb-4">
                  <Sparkles />
                </div>
                <h3 className="text-xl font-semibold mb-2">Piani personalizzati</h3>
                <p className="text-gray-600">Calendario creato su misura in base ai tuoi obiettivi e preferenze.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-mijob-lavender/10 text-mijob-lavender rounded-full flex items-center justify-center mb-4">
                  <Sparkles />
                </div>
                <h3 className="text-xl font-semibold mb-2">Opportunità verificate</h3>
                <p className="text-gray-600">Solo offerte di qualità, affidabili e adatte a studenti universitari.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Sparkles />
                </div>
                <h3 className="text-xl font-semibold mb-2">Modalità Esami</h3>
                <p className="text-gray-600">Riduci automaticamente gli impegni durante i periodi di esame.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gradient-to-br from-mijob-lavender/5 to-mijob-blue/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Gli studenti parlano di noi</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Scopri cosa dicono gli studenti che utilizzano MiJob per conciliare studio e lavoro.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://i.pravatar.cc/300?img=10" 
                    alt="Testimonial" 
                    className="w-12 h-12 rounded-full mr-3" 
                  />
                  <div>
                    <h4 className="font-semibold">Alessandro M.</h4>
                    <p className="text-sm text-gray-500">Studente di Economia</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "MiJob mi ha permesso di guadagnare abbastanza per pagare l'affitto senza compromettere lo studio. Il calendario personalizzato è geniale!"
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://i.pravatar.cc/300?img=11" 
                    alt="Testimonial" 
                    className="w-12 h-12 rounded-full mr-3" 
                  />
                  <div>
                    <h4 className="font-semibold">Giulia B.</h4>
                    <p className="text-sm text-gray-500">Studentessa di Ingegneria</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "La modalità Esami è stata fondamentale durante la sessione invernale. Ho potuto ridurre gli impegni e concentrarmi sullo studio."
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://i.pravatar.cc/300?img=12" 
                    alt="Testimonial" 
                    className="w-12 h-12 rounded-full mr-3" 
                  />
                  <div>
                    <h4 className="font-semibold">Matteo P.</h4>
                    <p className="text-sm text-gray-500">Studente di Medicina</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Non pensavo fosse possibile conciliare il mio corso di laurea con un lavoro, finché non ho scoperto MiJob. Ora raggiungo i miei obiettivi economici senza stress."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-mijob-lavender to-mijob-blue text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto a trasformare il tuo tempo libero?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Crea il tuo calendario personalizzato e inizia a guadagnare in modo intelligente.
            </p>
            <Link to="/calendar">
              <Button size="lg" className="bg-white text-mijob-lavender hover:bg-white/90 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Sparkles className="mr-2" />
                Crea il Tuo Calendario!
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
