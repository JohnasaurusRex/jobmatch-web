import React from 'react';
import { ScoreGauge } from '@/components/Gauge';
import { Card } from '@/components/ui/card';
import { AnalysisResponse } from '@/types/analysis';

interface HardSkillsTabProps {
  data: AnalysisResponse['hard_skills'];
}

export const HardSkillsTab: React.FC<HardSkillsTabProps> = ({ data }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight text-center lg:text-left">Hard Skills Analysis</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <Card className="p-6 h-80 lg:col-span-1">
        <ScoreGauge score={data.score} label="Hard Skills Score" />
      </Card>
      <div className="lg:col-span-3 space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Matched Skills</h3>
          <ul className="list-disc list-inside space-y-2">
            {data.matched_skills.map((skill, index) => (
              <li key={index} className="text-muted-foreground">{skill}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Missing Skills</h3>
          <ul className="list-disc list-inside space-y-2">
            {data.missing_skills.map((skill, index) => (
              <li key={index} className="text-muted-foreground">{skill}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Technical Proficiency</h3>
          <div className="w-48 mx-auto mb-4">
            <ScoreGauge score={data.technical_proficiency.score} label="Technical Proficiency" />
          </div>
          <h4 className="text-lg font-semibold mt-4 mb-2">Strengths:</h4>
          <ul className="list-disc list-inside space-y-2">
            {data.technical_proficiency.strengths.map((strength, index) => (
              <li key={index} className="text-muted-foreground">{strength}</li>
            ))}
          </ul>
          <h4 className="text-lg font-semibold mt-4 mb-2">Gaps:</h4>
          <ul className="list-disc list-inside space-y-2">
            {data.technical_proficiency.gaps.map((gap, index) => (
              <li key={index} className="text-muted-foreground">{gap}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Recommendations</h3>
          <ul className="list-disc list-inside space-y-2">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="text-muted-foreground">{rec}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  </div>
);

