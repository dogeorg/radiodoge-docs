import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Static export: pre-render search index at build time; no server at runtime
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source, {
  language: 'english',
});
