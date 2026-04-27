export type { SpecificSectionData } from './php';
import type { SpecificSectionData } from './php';

import php from './php';
import { SPECIFIC_CONTENT as othersContent } from './others';

export const SPECIFIC_CONTENT: Record<string, Record<string, SpecificSectionData>> = {
  php,
  ...othersContent,
};
