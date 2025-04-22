import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-mijob-blue via-blue-500 to-mijob-lavender text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
                  Hai un'ora libera?<br />
                  <span className="text-white/90">Falla fruttare.</span>
                </h1>
                <p className="mt-6 text-xl text-white/80 max-w-lg">
                  Trova lavoretti flessibili che si adattano al tuo orario universitario e alle tue esigenze. MiJob crea un calendario personalizzato in base a disponibilità, preferenze e obiettivi.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/calendar">
                    <Button size="lg" className="bg-mijob-orange hover:bg-mijob-orange/90 text-white px-8">
                      Crea il Tuo Calendario!
                    </Button>
                  </Link>
                  <Link to="/jobs">
                    <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10 px-8">
                      Esplora offerte
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center md:justify-end relative">
                <img 
                  src="https://i.pravatar.cc/400?img=8" 
                  alt="Studente che usa MiJob" 
                  className="rounded-lg shadow-xl max-w-full md:max-w-md object-cover animate-fade-in"
                />
                <div className="absolute -bottom-5 right-5 bg-white p-3 rounded-lg shadow-lg animate-slide-in">
                  <div className="text-black font-medium">Guadagno di Maria questo mese</div>
                  <div className="text-2xl font-bold text-mijob-orange mt-1">€520,00</div>
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Perché scegliere MiJob?</h2>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-mijob-blue/10 text-mijob-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Flessibilità totale</h3>
                      <p className="text-gray-600">Lavora solo quando sei disponibile, adattando gli impegni allo studio.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-mijob-orange/10 text-mijob-orange rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Piani personalizzati</h3>
                      <p className="text-gray-600">Calendario creato su misura in base ai tuoi obiettivi e preferenze.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-mijob-lavender/10 text-mijob-lavender rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Opportunità verificate</h3>
                      <p className="text-gray-600">Solo offerte di qualità, affidabili e adatte a studenti universitari.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Modalità Esami</h3>
                      <p className="text-gray-600">Riduci automaticamente gli impegni durante i periodi di esame.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://i.pravatar.cc/400?img=9" 
                  alt="Studenti che utilizzano MiJob" 
                  className="rounded-lg shadow-lg w-full" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
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
        <section className="py-16 bg-mijob-lavender">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Pronto a trasformare il tuo tempo libero?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Crea il tuo calendario personalizzato e inizia a guadagnare in modo intelligente.
            </p>
            <Link to="/calendar">
              <Button size="lg" className="bg-white text-mijob-lavender hover:bg-white/90 px-8">
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
