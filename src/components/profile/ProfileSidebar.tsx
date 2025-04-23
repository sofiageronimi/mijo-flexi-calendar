
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { mockUser, jobCategories } from '@/lib/data';

interface ProfileSidebarProps {
  examMode: boolean;
  setExamMode: (mode: boolean) => void;
  userData: { name: string; email: string; } | null;
}

const ProfileSidebar = ({ examMode, setExamMode, userData }: ProfileSidebarProps) => {
  const toggleExamMode = () => {
    setExamMode(!examMode);
    toast({
      title: examMode ? "Modalità Esami disattivata" : "Modalità Esami attivata",
      description: examMode 
        ? "Tornerai a ricevere tutte le notifiche e le offerte di lavoro." 
        : "Le notifiche e i turni saranno ridotti durante il periodo d'esame.",
    });
  };

  return (
    <div className="md:col-span-1">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-mijob-blue/10 flex items-center justify-center mb-4">
              <span className="text-3xl">{userData?.name.charAt(0)}</span>
            </div>
            <h2 className="text-xl font-semibold">{userData?.name}</h2>
            <p className="text-gray-600 text-sm mb-4">{userData?.email}</p>
            
            <div className="w-full mt-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-medium">Modalità Esami</p>
                  <p className="text-xs text-gray-600">Riduce notifiche e turni</p>
                </div>
                <Switch checked={examMode} onCheckedChange={toggleExamMode} />
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Categorie preferite</p>
                <div className="flex flex-wrap gap-2">
                  {mockUser.preferences.categories.map(categoryId => {
                    const category = jobCategories.find(c => c.id === categoryId);
                    return (
                      <Badge key={categoryId} variant="outline" className="bg-gray-100">
                        {category?.icon} {category?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">Guadagnato finora</span>
                <span className="font-medium text-mijob-orange">{mockUser.earnedThisMonth}€</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Obiettivo</span>
                <span>{mockUser.monthlyGoal}€</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-mijob-orange h-2.5 rounded-full" 
                  style={{ width: `${Math.min(100, (mockUser.earnedThisMonth / mockUser.monthlyGoal!) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="pt-3 border-t">
              <div className="flex justify-between">
                <span className="text-gray-600">Mancanti</span>
                <span className="font-medium">{(mockUser.monthlyGoal! - mockUser.earnedThisMonth)}€</span>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
