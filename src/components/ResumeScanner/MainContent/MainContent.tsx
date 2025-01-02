import { OverviewTab } from '../tabs/OverviewTab';
import { SearchabilityTab } from '../tabs/SearchabilityTab';
import { HardSkillsTab } from '../tabs/HardSkillsTab';
import { SoftSkillsTab } from '../tabs/SoftSkillsTab';
import { RecruiterTipsTab } from '../tabs/RecruiterTipsTab';

interface MainContentProps {
    activeTab: string;
    analysis: any;
}

export function MainContent({ activeTab, analysis }: MainContentProps) {
    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab data={analysis.overall} />;
            case 'searchability':
                return <SearchabilityTab data={analysis.searchability} />;
            case 'hardSkills':
                return <HardSkillsTab data={analysis.hard_skills} />;
            case 'softSkills':
                return <SoftSkillsTab data={analysis.soft_skills} />;
            case 'recruiterTips':
                return <RecruiterTipsTab data={analysis.recruiter_tips} />;
            default:
                return <div>Invalid tab</div>;
        }
    };

    return (
        <div className="w-full">
            {renderContent()}
        </div>
    );
}