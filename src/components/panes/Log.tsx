const COMMITS = [
  ["4fc1376", "(HEAD → main)", "wip: align tooltips by position"],
  ["5b67cc5", "", "add email icon → mailto:hi@samuelfchen.com"],
  ["f639619", "", "fix tooltip overflow at viewport edges"],
  ["80f05e8", "", "v2: terminal landing page"],
  ["ef7dcc5", "", "initial commit (next)"],
];

export default function Log() {
  return (
    <div className="log">
      <div>
        <span className="pk-path">~/samuelfchen</span>{" "}
        <span className="pk-name">main</span>
      </div>
      <div>
        <span className="pk-arrow">❯</span>{" "}
        <span className="pk-arrow">git</span> log --oneline --graph --decorate
      </div>
      {COMMITS.map(([hash, ref, msg], i) => (
        <div key={i}>
          <span className="graph">*</span>{" "}
          <span className="meta">{hash}</span>
          {ref && <span> <span className="ref">{ref}</span></span>}{" "}
          <span className="msg">{msg}</span>
        </div>
      ))}
      <div className="blink">▋</div>
    </div>
  );
}
