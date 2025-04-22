
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { mockJobs, jobCategories, timeSlots } from '@/lib/data';
import { JobCategory, TimeSlot } from '@/lib/types';

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPay, setMinPay] = useState<number>(8);
  const [selectedCategories, setSelectedCategories] = useState<JobCategory[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  
  const handleCategoryToggle = (category: JobCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const handleTimeSlotToggle = (timeSlot: TimeSlot) => {
    if (selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(t => t !== timeSlot));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
    }
  };
  
  const filteredJobs = mockJobs.filter(job => {
    // Filter by search term
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by minimum pay
    const matchesPay = job.hourlyRate >= minPay;
    
    // Filter by categories (if any selected)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category);
    
    // Filter by time slots (if any selected)
    const matchesTimeSlot = selectedTimeSlots.length === 0 || selectedTimeSlots.includes(job.timeSlot);
    
    return matchesSearch && matchesPay && matchesCategory && matchesTimeSlot;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Offerte di lavoro</h1>
            <p className="text-gray-600">
              Trova lavoretti flessibili adatti alle tue esigenze. Filtra per categoria, orario e retribuzione.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="font-semibold text-lg mb-4">Filtri</h2>
                
                <div className="mb-6">
                  <Label htmlFor="search" className="block mb-2 font-medium">Cerca</Label>
                  <Input
                    id="search"
                    placeholder="Cerca per titolo, azienda o luogo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="mb-6">
                  <Label className="block mb-2 font-medium">Paga minima: {minPay}€/ora</Label>
                  <Slider
                    defaultValue={[minPay]}
                    max={25}
                    min={5}
                    step={1}
                    onValueChange={(value) => setMinPay(value[0])}
                    className="my-4"
                  />
                </div>
                
                <div className="mb-6">
                  <Label className="block mb-2 font-medium">Categorie</Label>
                  <div className="space-y-2">
                    {jobCategories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`filter-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <Label htmlFor={`filter-category-${category.id}`} className="cursor-pointer">
                          <span className="mr-1">{category.icon}</span> {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label className="block mb-2 font-medium">Fasce orarie</Label>
                  <div className="space-y-2">
                    {timeSlots.map(timeSlot => (
                      <div key={timeSlot.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`filter-timeslot-${timeSlot.id}`}
                          checked={selectedTimeSlots.includes(timeSlot.id as TimeSlot)}
                          onCheckedChange={() => handleTimeSlotToggle(timeSlot.id as TimeSlot)}
                        />
                        <Label htmlFor={`filter-timeslot-${timeSlot.id}`} className="cursor-pointer">
                          {timeSlot.label} ({timeSlot.timeRange})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Filter count and reset */}
                {(selectedCategories.length > 0 || selectedTimeSlots.length > 0 || minPay > 8 || searchTerm) && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">
                      Filtri attivi: {selectedCategories.length + selectedTimeSlots.length + (minPay > 8 ? 1 : 0) + (searchTerm ? 1 : 0)}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedTimeSlots([]);
                        setMinPay(8);
                        setSearchTerm('');
                      }}
                      className="text-mijob-blue hover:text-mijob-blue/80 text-sm font-medium"
                    >
                      Reimposta filtri
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="md:col-span-3">
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">Nessun lavoro trovato</h3>
                  <p className="text-gray-600 mb-4">Prova a modificare i filtri di ricerca.</p>
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedTimeSlots([]);
                      setMinPay(8);
                      setSearchTerm('');
                    }}
                    className="text-mijob-blue hover:text-mijob-blue/80 font-medium"
                  >
                    Reimposta filtri
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobListings;
