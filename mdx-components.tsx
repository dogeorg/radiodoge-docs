import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { InteractiveMap } from '@/components/home/InteractiveMap';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    InteractiveMap,
    ...components,
  };
}
