
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamMember from '@/components/TeamMember';
import { teamMembers } from '@/lib/data';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-mijob-blue to-mijob-lavender text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Chi siamo</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              La nostra missione è rendere la vita universitaria più sostenibile, con un'esperienza centrata sulle reali esigenze dello studente.
            </p>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">La nostra storia</h2>
                <p className="text-gray-700 mb-4">
                  Ciao! Noi siamo Francesca, Daniele, Marco, Sofia e Timothy. Siamo giovani studenti universitari che hanno voluto metttersi in gioco per creare qualcosa che potesse essere d'aiuto a tutti.
                </p>
                <p className="text-gray-700 mb-4">
                  La nostra missione è rendere la vita universitaria più sostenibile, offrendo agli studenti la possibilità di guadagnare in modo flessibile, intelligente e personalizzato. Crediamo che studiare e lavorare possano coesistere, se supportati dalla giusta tecnologia e da un'esperienza centrata sulle reali esigenze dello studente.
                </p>
                <p className="text-gray-700">
                  Tutto è iniziato quando, da studenti con le tasche vuote, abbiamo sperimentato in prima persona la difficoltà di trovare lavoretti che si adattassero ai nostri orari universitari. Così è nato MiJob, una piattaforma pensata per chi, come noi, cerca opportunità lavorative davvero flessibili.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://i.pravatar.cc/400?img=15" 
                  alt="Il team di MiJob" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-12">I nostri valori</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-mijob-blue text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                  🔄
                </div>
                <h3 className="text-xl font-semibold mb-3">Flessibilità</h3>
                <p className="text-gray-600">
                  Crediamo che il lavoro debba adattarsi alla vita degli studenti, non viceversa. Le nostre soluzioni mettono al centro l'equilibrio tra studio e lavoro.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-mijob-orange text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                  💯
                </div>
                <h3 className="text-xl font-semibold mb-3">Qualità</h3>
                <p className="text-gray-600">
                  Selezioniamo attentamente ogni opportunità di lavoro per garantire esperienze sicure, formative e adeguatamente retribuite.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-mijob-lavender text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                  🤝
                </div>
                <h3 className="text-xl font-semibold mb-3">Comunità</h3>
                <p className="text-gray-600">
                  MiJob è più di una piattaforma: è una comunità di studenti che si aiutano a crescere professionalmente e raggiungere l'indipendenza economica.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Il nostro team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map(member => (
                <TeamMember key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Vision Section */}
        <section className="py-16 md:py-20 bg-mijob-lavender/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 order-2 md:order-1">
                <img 
                  src="https://i.pravatar.cc/400?img=16" 
                  alt="La visione di MiJob" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">La nostra visione</h2>
                <p className="text-gray-700 mb-4">
                  Aspiriamo a creare un futuro in cui ogni studente possa avere l'opportunità di sviluppare competenze professionali e guadagnare denaro senza compromettere il proprio percorso accademico.
                </p>
                <p className="text-gray-700 mb-4">
                  Vogliamo costruire un ponte tra il mondo accademico e quello professionale, offrendo ai giovani talenti la possibilità di mettersi alla prova in contesti lavorativi reali, sviluppando competenze pratiche e costruendo un network professionale fin dai primi anni di università.
                </p>
                <p className="text-gray-700">
                  Il nostro obiettivo è che MiJob diventi lo strumento essenziale per ogni studente che vuole costruire il proprio futuro, un passo alla volta, conciliando studio, lavoro e vita personale.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
