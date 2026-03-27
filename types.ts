/**
 * TypeScript interfaces for the portfolio application
 * Defines the structure of data used throughout the app
 */

/**
 * Represents a single tool/technology category within a project
 */
export interface ToolCategory {
  name: string;
  items: string[];
}

/**
 * Represents the overview section of a project
 * Can be either a single string or an array of strings for multiple paragraphs
 */
export interface ProjectOverview {
  sections: string | string[];
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
}

export interface ProjectDemoCredentials {
  email?: string;
  password?: string;
}

/**
 * Represents a single project/expedition in the portfolio
 * Contains all necessary information for displaying project details
 */
export interface Expedition {
  id: number;
  date: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  cardImageUrl?: string;
  cardImageAlt?: string;
  cardImageFit?: 'cover' | 'contain';
  galleryImages?: ProjectGalleryImage[];
  demoUrl?: string;
  demoMode?: 'iframe' | 'external';
  demoCredentials?: ProjectDemoCredentials;
  githubRepoUrl?: string;
  side: 'left' | 'right';
  tools?: ToolCategory[];
  overview?: ProjectOverview;
}
