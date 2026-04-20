'use server';
/**
 * @fileOverview A Genkit flow for summarizing a user's Digital Identity Federated Footprint (DIFF)
 * based on NUKED and KNOXED items.
 *
 * - generateDiffSummary - A function that provides a clear, concise, and easy-to-understand summary of NUKED and KNOXED items.
 * - GenerateDiffSummaryInput - The input type for the generateDiffSummary function.
 * - GenerateDiffSummaryOutput - The return type for the generateDiffSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateDiffSummaryInputSchema = z.object({
  nukedItems: z.array(z.string()).describe('A list of descriptions of NUKED items and their implications.'),
  knoxedItems: z.array(z.string()).describe('A list of descriptions of KNOXED items and their implications.'),
});
export type GenerateDiffSummaryInput = z.infer<typeof GenerateDiffSummaryInputSchema>;

const GenerateDiffSummaryOutputSchema = z.object({
  summary: z.string().describe('A clear, concise, and easy-to-understand summary of NUKED and KNOXED items and their implications for the user\'s overall security status.'),
});
export type GenerateDiffSummaryOutput = z.infer<typeof GenerateDiffSummaryOutputSchema>;

export async function generateDiffSummary(input: GenerateDiffSummaryInput): Promise<GenerateDiffSummaryOutput> {
  return generateDiffSummaryFlow(input);
}

const generateDiffSummaryPrompt = ai.definePrompt({
  name: 'generateDiffSummaryPrompt',
  input: { schema: GenerateDiffSummaryInputSchema },
  output: { schema: GenerateDiffSummaryOutputSchema },
  prompt: `You are Architect AI, an expert in digital identity security. Your task is to provide a clear, concise, and easy-to-understand summary of the user's digital identity footprint. Focus on explaining the NUKED and KNOXED items and their implications for the user's overall security status.\n\nHere are the NUKED items:\n{{#if nukedItems}}\n  {{#each nukedItems}}\n  - {{{this}}}\n  {{/each}}\n{{else}}\n  - No NUKED items found. This means your exposed digital elements are minimal or have been remediated.\n{{/if}}\n\nHere are the KNOXED items:\n{{#if knoxedItems}}\n  {{#each knoxedItems}}\n  - {{{this}}}\n  {{/each}}\n{{else}}\n  - No KNOXED items found. This indicates that currently no specific items are identified as secured, encrypted, or hardened.\n{{/if}}\n\nBased on the provided NUKED and KNOXED items, please generate a summary that helps the user quickly grasp their overall security status without wading through raw data. The summary should be formatted as a JSON object with a single 'summary' field.`,
});

const generateDiffSummaryFlow = ai.defineFlow(
  {
    name: 'generateDiffSummaryFlow',
    inputSchema: GenerateDiffSummaryInputSchema,
    outputSchema: GenerateDiffSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await generateDiffSummaryPrompt(input);
    return output!;
  }
);
