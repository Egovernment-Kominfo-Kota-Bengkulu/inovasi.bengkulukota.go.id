// src/routes/innovation/[id]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    return { id: params.id };
};