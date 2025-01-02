import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import {OverviewTab} from './tabs/OverviewTab';
import {HardSkillsTab} from './tabs/HardSkillsTab';
import {SoftSkillsTab} from './tabs/SoftSkillsTab';
import {RecruiterTipsTab} from './tabs/RecruiterTipsTab';
import { AnalysisResponse } from '@/types/analysis';

const ResultSection = ({ analysis }: { analysis: AnalysisResponse }) => (
  <Card className="w-1/2 h-full flex flex-col">
    <CardHeader className="border-b flex-none">
      <CardTitle>Analysis Results</CardTitle>
    </CardHeader>
    <CardContent className="flex-1 overflow-hidden">
      {analysis && (
        <Tabs>
          <Tabs.Tab label="Overview">
            <OverviewTab data={analysis.overall} />
          </Tabs.Tab>

          <Tabs.Tab label="Hard Skills">
            <HardSkillsTab data={analysis.hard_skills} />
          </Tabs.Tab>

          <Tabs.Tab label="Soft Skills">
            <SoftSkillsTab data={analysis.soft_skills} />
          </Tabs.Tab>

          <Tabs.Tab label="Recruiter Tips">
            <RecruiterTipsTab data={analysis.recruiter_tips} />
          </Tabs.Tab>
        </Tabs>
      )}
    </CardContent>
  </Card>
);

export default ResultSection;
