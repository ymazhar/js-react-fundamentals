/**
 * ReferencesSection Component
 * Displays curated learning resources about the JavaScript event loop
 *
 * Features:
 * - Categorized resources (Documentation, Articles, Videos)
 * - Accessible links that open in new tabs
 * - Responsive grid layout
 * - Smooth hover animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ReferencesSectionProps, Resource, ResourceCategoryData } from './ReferencesSection.types';
import {
  SECTION_TITLE,
  SECTION_DESCRIPTION,
  RESOURCE_CATEGORIES,
  EXTERNAL_LINK_LABEL,
} from './ReferencesSection.constants';
import styles from './ReferencesSection.module.scss';

/**
 * External link icon component
 * Provides visual indication that link opens in new tab
 */
const ExternalLinkIcon: React.FC = () => (
  <svg
    className={styles.externalIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/**
 * User icon for author attribution
 */
const UserIcon: React.FC = () => (
  <svg
    className={styles.metaIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/**
 * Clock icon for duration
 */
const ClockIcon: React.FC = () => (
  <svg
    className={styles.metaIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/**
 * Animation variants for staggered resource cards
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
    },
  },
} as const;

/**
 * ResourceCard component
 * Renders a single resource with title, description, and metadata
 */
const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
  <motion.a
    href={resource.url}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.resource}
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Resource title with external link indicator */}
    <div className={styles.resourceHeader}>
      <h4 className={styles.resourceTitle}>{resource.title}</h4>
      <ExternalLinkIcon />
      <span className={styles.srOnly}>{EXTERNAL_LINK_LABEL}</span>
    </div>

    {/* Resource description */}
    <p className={styles.resourceDescription}>{resource.description}</p>

    {/* Metadata: author and duration */}
    <div className={styles.resourceMeta}>
      {resource.author && (
        <span className={styles.resourceAuthor}>
          <UserIcon />
          {resource.author}
        </span>
      )}
      {resource.duration && (
        <span className={styles.resourceDuration}>
          <ClockIcon />
          {resource.duration}
        </span>
      )}
    </div>
  </motion.a>
);

/**
 * ResourceCategory component
 * Renders a category heading and its list of resources
 */
const ResourceCategorySection: React.FC<{ category: ResourceCategoryData }> = ({ category }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
  >
    {/* Category heading */}
    <h3 className={styles.categoryTitle}>
      <span className={styles.categoryIcon} role="img" aria-hidden="true">
        {category.icon}
      </span>
      {category.title}
    </h3>

    {/* Resource grid */}
    <div className={styles.resourceList}>
      {category.resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  </motion.div>
);

/**
 * ReferencesSection component
 * Main component that displays all resource categories
 */
const ReferencesSection: React.FC<ReferencesSectionProps> = ({ className }) => {
  return (
    <section className={`${styles.section} ${className || ''}`} aria-labelledby="references-title">
      <div className={styles.card}>
        {/* Section header */}
        <header className={styles.header}>
          <h2 id="references-title" className={styles.title}>
            {SECTION_TITLE}
          </h2>
          <p className={styles.description}>{SECTION_DESCRIPTION}</p>
        </header>

        {/* Content area with all categories */}
        <div className={styles.content}>
          <div className={styles.categories}>
            {RESOURCE_CATEGORIES.map(category => (
              <ResourceCategorySection key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;
