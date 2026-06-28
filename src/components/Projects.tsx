import projects from "../../data/projects.json";

export default function Projects() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Projects
      </h2>
      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-1.5 rounded-lg border border-border bg-background p-4 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.02]"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground group-hover:text-foreground">
                {project.name}
              </h3>
              <svg
                className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
            {project.tech && project.tech.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
