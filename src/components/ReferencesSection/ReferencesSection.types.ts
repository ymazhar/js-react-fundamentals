/**
 * ReferencesSection Component Types
 * TypeScript interfaces and types for the ReferencesSection component
 */

/**
 * Resource category identifiers
 */
export type ResourceCategory = 'documentation' | 'articles' | 'videos';

/**
 * Represents a single learning resource
 */
export interface Resource {
  /** Unique identifier for the resource */
  id: string;
  /** Display title of the resource */
  title: string;
  /** Brief description of what the resource covers */
  description: string;
  /** URL to the resource (opens in new tab) */
  url: string;
  /** Optional author or source name */
  author?: string;
  /** Optional estimated reading/watching time */
  duration?: string;
}

/**
 * Represents a category of resources with its metadata
 */
export interface ResourceCategoryData {
  /** Category identifier */
  id: ResourceCategory;
  /** Display title for the category */
  title: string;
  /** Icon or emoji for the category */
  icon: string;
  /** List of resources in this category */
  resources: Resource[];
}

/**
 * Props for the ReferencesSection component
 */
export interface ReferencesSectionProps {
  /** Optional custom class name */
  className?: string;
}
