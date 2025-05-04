
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TeamMember as TeamMemberType } from '@/lib/types';
import { UserRound } from 'lucide-react';

interface TeamMemberProps {
  member: TeamMemberType;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-mijob-lavender/10 flex items-center justify-center">
          <UserRound className="text-mijob-lavender" size={64} />
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
