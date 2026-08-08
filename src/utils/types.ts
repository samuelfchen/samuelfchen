export interface ContactLink {
  icon: string
  label: string
  url: string
}

export interface BlogPostFrontmatter {
  slug: string
  title: string
  subtitle?: string
  date?: string
  featuredImage?: string
}

export interface BlogPost {
  id: string
  excerpt?: string
  timeToRead?: number
  frontmatter: BlogPostFrontmatter
}

export interface PhotoAlbumFrontmatter {
  slug: string
  title: string
  subtitle?: string
  date?: string
  featuredImage?: string
}

export interface PhotoAlbum {
  id: string
  frontmatter: PhotoAlbumFrontmatter
}
