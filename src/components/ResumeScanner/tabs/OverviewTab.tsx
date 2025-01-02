import React from 'react';
import { ThumbsUp, InfoIcon } from 'lucide-react';
import { ScoreGauge } from '@/components/Gauge';
import { Card } from '@/components/ui/card';
import { AnalysisResponse } from '@/types/analysis';

interface OverviewTabProps {
  data: AnalysisResponse['overall'];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight text-center lg:text-left">Overview Analysis</h1>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <Card className="p-6 h-80 lg:col-span-1">
        <ScoreGauge score={data.total_score} label="Overall Score" />
      </Card>
      <div className="lg:col-span-3 space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <InfoIcon className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">{data.applying_for.job_title}</h3>
          </div>
          <p className="text-muted-foreground">{data.applying_for.explanation}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp className="text-primary w-5 h-5" />
            <h3 className="text-xl font-bold">Shortlist Recommendation</h3>
          </div>
          <p className="text-muted-foreground">{data.shortlist_recommendation.explanation}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Key Strengths</h3>
          <ul className="list-disc list-inside space-y-2">
            {data.key_strengths.map((strength, index) => (
              <li key={index} className="text-muted-foreground">{strength}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Critical Improvements</h3>
          <ul className="list-disc list-inside space-y-2">
            {data.critical_improvements.map((improvement, index) => (
              <li key={index} className="text-muted-foreground">{improvement}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  </div>
);