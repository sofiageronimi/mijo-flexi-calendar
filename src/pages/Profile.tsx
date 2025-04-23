
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { isAuthenticated } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const [examMode, setExamMode] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  
  useEffect(() => {
    if (!authenticated) {
      toast({
        title: "Accesso negato",
        description: "Devi effettuare l'accesso per visualizzare il tuo profilo.",
        variant: "destructive",
      });
      navigate('/auth');
    } else {
      const userString = localStorage.getItem('mijob_user');
      if (userString) {
        try {
          setUserData(JSON.parse(userString));
        } catch (error) {
          console.error("Error parsing user data", error);
        }
      }
    }
  }, [authenticated, navigate]);
  
  if (!authenticated || !userData) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <ProfileHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProfileSidebar 
              examMode={examMode} 
              setExamMode={setExamMode} 
              userData={userData} 
            />
            <ProfileTabs />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
