import React from 'react';
import { ScoreGauge } from '@/components/Gauge';
import { AnalysisResponse } from '@/types/analysis';
import { Card } from '@/components/ui/card';

interface RecruiterTipsTabProps {
  data: AnalysisResponse['recruiter_tips'];
}

export const RecruiterTipsTab: React.FC<RecruiterTipsTabProps> = ({ data }) => {
  if (!data) {
    return <div>No recruiter tips data available</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-center lg:text-left">Recruiter Tips</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="p-6 h-80 lg:col-span-1">
          <ScoreGauge score={data.score} label="Recruiter Tips" />
        </Card>
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <h4 className="text-xl font-bold mb-4">Job Level Match</h4>
            <p className="text-muted-foreground"><strong>Assessment:</strong> {data.job_level_match.assessment}</p>
            <p className="text-muted-foreground"><strong>Recommendation:</strong> {data.job_level_match.recommendation}</p>
          </Card>

          <Card className="p-6">
            <h4 className="text-xl font-bold mb-4">Measurable Results</h4>
            <h5 className="text-lg font-semibold mt-4 mb-2">Present:</h5>
            <ul className="list-disc list-inside space-y-2">
              {Array.isArray(data.measurable_results) ? (
                data.measurable_results.map((result, index) => (
                  <li key={index} className="text-muted-foreground">{result}</li>
                ))
              ) : data.measurable_results?.present?.map((result, index) => (
                <li key={index} className="text-muted-foreground">{result}</li>
              ))}
            </ul>
            <h5 className="text-lg font-semibold mt-4 mb-2">Missing:</h5>
            <ul className="list-disc list-inside space-y-2">
              {Array.isArray(data.measurable_results?.missing) && 
                data.measurable_results.missing.map((result, index) => (
                  <li key={index} className="text-muted-foreground">{result}</li>
                ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h4 className="text-xl font-bold mb-4">Resume Tone</h4>
            <p className="text-muted-foreground"><strong>Assessment:</strong> {data.resume_tone.assessment}</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Improvements:</h5>
            <ul className="list-disc list-inside space-y-2">
              {Array.isArray(data.resume_tone.improvements) &&
                data.resume_tone.improvements.map((improvement, index) => (
                  <li key={index} className="text-muted-foreground">{improvement}</li>
                ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h4 className="text-xl font-bold mb-4">Web Presence</h4>
            <h5 className="text-lg font-semibold mt-4 mb-2">Mentioned:</h5>
            <ul className="list-disc list-inside space-y-2">
              {Array.isArray(data.web_presence.mentioned) &&
                data.web_presence.mentioned.map((mention, index) => (
                  <li key={index} className="text-muted-foreground">{mention}</li>
                ))}
            </ul>
            <h5 className="text-lg font-semibold mt-4 mb-2">Recommended:</h5>
            <ul className="list-disc list-inside space-y-2">
              {Array.isArray(data.web_presence.recommended) &&
                data.web_presence.recommended.map((recommend, index) => (
                  <li key={index} className="text-muted-foreground">{recommend}</li>
                ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
    );
};

