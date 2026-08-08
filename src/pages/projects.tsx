import React from "react"

import Layout from "../templates/Layout"
import Seo from "../components/seo"

interface Project {
  name: string
  description: string
  url?: string
}

const projects: Project[] = [
  {
    name: "samuelfchen.com",
    description: "This site — a Gatsby-powered personal site and photo journal.",
    url: "/",
  },
]

const ProjectPage = () => (
  <Layout>
    <h1>Projects</h1>
    {projects.map(project => (
      <article key={project.name}>
        <h2>
          {project.url ? (
            <a href={project.url}>{project.name}</a>
          ) : (
            project.name
          )}
        </h2>
        <p>{project.description}</p>
      </article>
    ))}
  </Layout>
)

export default ProjectPage

export const Head = () => <Seo title="Projects" />
