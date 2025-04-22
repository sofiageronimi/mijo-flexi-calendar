
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TeamMember as TeamMemberType } from '@/lib/types';

interface TeamMemberProps {
  member: TeamMemberType;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg">{member.name}</h3>
          <p className="text-mijob-lavender font-medium text-sm mb-2">{member.role}</p>
          <p className="text-gray-600 text-sm">{member.bio}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
