
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const WaitingListForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validazione base dell'email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Errore",
        description: "Per favore inserisci un indirizzo email valido",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Insert email into Supabase
      const { error } = await supabase
        .from('waiting_list')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation code
          toast({
            title: "Attenzione",
            description: "Questa email è già registrata nella waiting list.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        setEmail('');
        toast({
          title: "Grazie!",
          description: "Ti abbiamo aggiunto alla waiting list.",
        });
        
        // Send notification email to admin using FormSubmit as fallback for notifications
        await fetch("https://formsubmit.co/ajax/info.mijob@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            email: email,
            subject: "Nuova iscrizione alla waiting list MiJob",
            message: `Nuova email per la waiting list: ${email}`
          })
        });
      }
    } catch (error) {
      console.error("Errore durante l'invio:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un problema. Per favore riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl p-6 md:p-8 bg-black/30 backdrop-blur-sm border border-white/20 shadow-xl">
      <h3 className="text-xl font-semibold text-center mb-4 text-white">
        Ti piace il progetto? Lasciaci la tua email per entrare nella waiting list!
      </h3>
      
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <Check size={24} />
          </div>
          <p className="text-lg font-medium text-white">Grazie! Ti abbiamo aggiunto alla waiting list.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="La tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black placeholder:text-gray-400"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-mijob-orange hover:bg-mijob-orange/90 text-white py-2"
            disabled={isLoading}
          >
            {isLoading ? "Invio in corso..." : "Unisciti alla lista"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default WaitingListForm;
