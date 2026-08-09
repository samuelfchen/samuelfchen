type Commit = { hash: string; refs: string; subject: string; date: string };

function parseLog(log: string): Commit[] {
  return log
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [hash = "", refs = "", subject = "", date = ""] = line.split("\x1f");
      return { hash, refs, subject, date };
    });
}

export default function Log({
  branch,
  log,
}: {
  branch: string;
  log: string;
}) {
  const commits = parseLog(log);

  return (
    <div className="log">
      <div>
        <span className="pk-path">~/samuelfchen</span>{" "}
        <span className="pk-name">{branch}</span>
      </div>
      <div>
        <span className="pk-arrow">❯</span>{" "}
        <span className="pk-arrow">git</span> log --oneline --decorate -n 10
      </div>
      {commits.map((c, i) => (
        <div className="log-cmt" key={i}>
          <span className="graph">* </span>
          <span className="meta">{c.hash}</span>
          {c.refs && <span className="ref"> {c.refs}</span>}
          <span className="msg"> {c.subject}</span>
          <span className="log-date"> ({c.date})</span>
        </div>
      ))}
      <div className="blink">▋</div>
    </div>
  );
}
