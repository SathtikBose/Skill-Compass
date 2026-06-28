import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

interface SkillsChartProps {
  skills: any[];
}

const SkillsChart: React.FC<SkillsChartProps> = ({ skills }) => {
  // Aggregate proficiencies by category
  const categoryScores: Record<string, number> = {};
  
  const proficiencyWeights: Record<string, number> = {
    'Beginner': 25,
    'Intermediate': 50,
    'Advanced': 75,
    'Expert': 100
  };

  skills.forEach(skill => {
    if (!categoryScores[skill.category]) {
      categoryScores[skill.category] = 0;
    }
    categoryScores[skill.category] = Math.max(categoryScores[skill.category], proficiencyWeights[skill.proficiency] || 25);
  });

  const data = Object.keys(categoryScores).map(key => ({
    subject: key,
    A: categoryScores[key],
    fullMark: 100,
  }));

  if (data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-neutral-500">No skills data available</div>;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#171717', borderColor: '#333', borderRadius: '8px' }}
            itemStyle={{ color: '#818cf8' }}
          />
          <Radar name="Proficiency" dataKey="A" stroke="#818cf8" fill="#818cf8" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;
