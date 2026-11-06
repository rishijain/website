// The controlled tag vocabulary: the single source for blog tags.
// Adding a tag is a deliberate edit here, approved by the owner in the same
// diff as the post that needs it. Soft cap of about 8.
export const TAG_IDS = ['ai-agents', 'rails', 'speaking', 'building-products', 'career'] as const;

export type Tag = (typeof TAG_IDS)[number];

export const TAG_NAMES: Record<Tag, string> = {
  'ai-agents': 'AI agents',
  rails: 'Rails',
  speaking: 'Speaking',
  'building-products': 'Building products',
  career: 'Career',
};
