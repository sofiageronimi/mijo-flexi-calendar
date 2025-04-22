
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    toast({
      title: "Messaggio inviato",
      description: "Grazie per averci contattato! Ti risponderemo al più presto.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-mijob-orange to-mijob-blue text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Contattaci</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Hai domande o feedback? Siamo qui per aiutarti a sfruttare al meglio MiJob.
            </p>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Inviaci un messaggio</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Il tuo nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="La tua email" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Oggetto</Label>
                    <Input id="subject" placeholder="Oggetto del messaggio" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Messaggio</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Scrivi il tuo messaggio qui..." 
                      rows={6} 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto px-8">Invia messaggio</Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Informazioni di contatto</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <a href="mailto:info.mijob@gmail.com" className="text-mijob-blue hover:underline">
                      info.mijob@gmail.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Sede</h3>
                    <p className="text-gray-700">Milano, Italia</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Orari di supporto</h3>
                    <p className="text-gray-700">Lunedì - Venerdì: 9:00 - 18:00</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Seguici</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-600 hover:text-mijob-blue transition-colors">
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-600 hover:text-mijob-blue transition-colors">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Domande frequenti</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Per studenti</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Come funziona MiJob?</AccordionTrigger>
                    <AccordionContent>
                      MiJob ti permette di impostare le tue disponibilità orarie, preferenze lavorative e obiettivi economici. Sulla base di questi dati, la piattaforma genera un calendario personalizzato con opportunità di lavoro flessibili che si adattano ai tuoi impegni.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Devo pagare per usare MiJob?</AccordionTrigger>
                    <AccordionContent>
                      No, MiJob è completamente gratuito per gli studenti. Guadagniamo attraverso commissioni pagate dalle aziende che pubblicano offerte sulla nostra piattaforma.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Come vengo pagato per i lavori svolti?</AccordionTrigger>
                    <AccordionContent>
                      Il pagamento viene effettuato direttamente dall'azienda per cui lavori, secondo le modalità indicate nell'offerta di lavoro. MiJob non gestisce direttamente i pagamenti tra studenti e datori di lavoro.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Cosa succede se non posso presentarmi a un turno?</AccordionTrigger>
                    <AccordionContent>
                      È importante avvisare con il massimo preavviso possibile. Tramite l'app puoi cancellare la tua disponibilità con almeno 24 ore di anticipo. In caso di emergenze, consigliamo di contattare direttamente il datore di lavoro.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Per datori di lavoro</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Come posso pubblicare un'offerta su MiJob?</AccordionTrigger>
                    <AccordionContent>
                      Per pubblicare un'offerta, devi registrarti come azienda sulla piattaforma. Una volta completata la registrazione, potrai creare e gestire le tue offerte di lavoro tramite il pannello di controllo aziendale.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Quanto costa pubblicare un'offerta?</AccordionTrigger>
                    <AccordionContent>
                      Offriamo diversi piani tariffari basati sul volume di pubblicazioni. Puoi iniziare con un piano base gratuito che include un numero limitato di offerte al mese, o scegliere piani premium con funzionalità avanzate. Contattaci per un preventivo personalizzato.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger>Che tipo di controlli fate sugli studenti?</AccordionTrigger>
                    <AccordionContent>
                      Verifichiamo l'identità e lo status di studente di tutti gli iscritti. Gli studenti possono anche ricevere feedback e valutazioni che contribuiscono al loro profilo di affidabilità sulla piattaforma.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8">
                    <AccordionTrigger>Posso richiedere studenti con competenze specifiche?</AccordionTrigger>
                    <AccordionContent>
                      Assolutamente sì. Durante la creazione dell'offerta, puoi specificare competenze, esperienze o requisiti particolari. Il nostro sistema mostrerà l'offerta agli studenti più idonei in base alle competenze indicate.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
        
        {/* Privacy & Terms Section */}
        <section id="privacy" className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Privacy e Termini</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Informativa sulla Privacy</h3>
                <div className="prose max-w-none">
                  <p>
                    MiJob raccoglie e tratta i dati personali degli utenti nel rispetto del Regolamento UE 2016/679 (GDPR) e della normativa italiana applicabile.
                  </p>
                  <p>
                    Raccogliamo solo i dati necessari per fornire i nostri servizi, come informazioni di contatto, dati di profilo e preferenze lavorative.
                  </p>
                  <p>
                    Non condividiamo i tuoi dati con terze parti senza il tuo consenso, ad eccezione di quanto necessario per l'erogazione del servizio o per obblighi di legge.
                  </p>
                  <p>
                    Hai diritto di accedere, modificare o richiedere la cancellazione dei tuoi dati in qualsiasi momento.
                  </p>
                  <p>
                    Per maggiori informazioni, contattaci all'indirizzo info.mijob@gmail.com.
                  </p>
                </div>
              </div>
              
              <div id="terms">
                <h3 className="text-xl font-semibold mb-4">Termini di Servizio</h3>
                <div className="prose max-w-none">
                  <p>
                    L'accesso e l'utilizzo di MiJob sono soggetti ai presenti Termini di Servizio. Utilizzando la piattaforma, accetti integralmente questi termini.
                  </p>
                  <p>
                    MiJob agisce come intermediario tra studenti e datori di lavoro, ma non è parte dei rapporti di lavoro che possono instaurarsi tra di essi.
                  </p>
                  <p>
                    Gli utenti sono responsabili della veridicità delle informazioni fornite durante la registrazione e nell'uso della piattaforma.
                  </p>
                  <p>
                    MiJob si riserva il diritto di sospendere o terminare l'accesso agli utenti che violano i Termini di Servizio o che utilizzano la piattaforma in modo improprio.
                  </p>
                  <p>
                    I contenuti pubblicati su MiJob sono protetti da copyright e non possono essere riprodotti senza autorizzazione.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
