import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = "";
  let label = "";

  if (score > 70) {
    badgeColor = "bg-green-200 text-green-600";
    label = "Strong";
  } else if (score > 49) {
    badgeColor = "bg-yellow-200 text-yellow-600";
    label = "Good Start";
  } else {
    badgeColor = "bg-red-200 text-red-600";
    label = "Needs Work";
  }

  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor}`}>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export default ScoreBadge;
