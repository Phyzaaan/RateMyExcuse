interface ScoreBarProps {
  step: number;
  improvisation: number;
  confidence: number;
  creativity: number;
}

export default function ScoreBar({
  step,
  improvisation,
  confidence,
  creativity,
}: ScoreBarProps) {
  const metrics = [
    {
      name: "💎 Improvisation",
      value: improvisation,
      accent: "from-amber-400 to-orange-400",
    },
    {
      name: "💡 Creativity",
      value: creativity,
      accent: "from-fuchsia-400 to-pink-500",
    },
    {
      name: "🚀 Confidence",
      value: confidence,
      accent: "from-sky-400 to-cyan-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2 py-2 sm:grid-cols-3">
      {metrics.map((metric) => {
        const visible = step > 3;
        return (
          <div
            key={metric.name}
            className={`p-2 `}
          >
            <div className="flex items-center justify-between text-sm font-semibold text-secondary">
              <span>{metric.name}</span>
              <span className="font-black text-primary">{metric.value}/10</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full bg-linear-to-r ${metric.accent} transition-all duration-700 ease-out`}
                style={{
                  width: visible ? `${metric.value * 10}%` : "0%",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
