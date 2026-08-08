import type { ReactNode } from "react";

interface PaneProps {
  active?: boolean;
  children: ReactNode;
}

export default function Pane({ active = false, children }: PaneProps) {
  return (
    <section className={`pane${active ? " active" : ""}`}>
      <div className="pane-body">{children}</div>
    </section>
  );
}
