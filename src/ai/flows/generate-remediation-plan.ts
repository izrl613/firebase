'use server';
/**
 * @fileOverview A Genkit flow for generating actionable remediation plans for 'NUKED' digital identity items.
 *
 * - generateRemediationPlan - A function that handles the generation of remediation steps.
 * - GenerateRemediationPlanInput - The input type for the generateRemediationPlan function.
 * - GenerateRemediationPlanOutput - The return type for the generateRemediationPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NukedItemInputSchema = z.object({
  type: z.string().describe('The category or type of the NUKED item (e.g., Email Breach, Social Media Exposure, Device File Leak).'),
  description: z.string().describe('A detailed description of the NUKED item, including what was exposed and where.'),
  dataExposed: z.array(z.string()).optional().describe('An optional list of specific data elements that were exposed (e.g., "email address", "password hash", "phone number").'),
  context: z.string().optional().describe('Any additional context or details relevant to the NUKED item.'),
});
export type GenerateRemediationPlanInput = z.infer<typeof NukedItemInputSchema>;

const RemediationStepSchema = z.object({
  stepNumber: z.number().describe('The sequential number of the remediation step.'),
  description: z.string().describe('The specific, actionable instruction for the user to take.'),
  expectedOutcome: z.string().optional().describe('What the user can expect to achieve or secure after completing this step.'),
  priority: z.enum(['high', 'medium', 'low']).optional().describe('The suggested priority for undertaking this remediation step.'),
});

const RemediationPlanOutputSchema = z.object({
  planTitle: z.string().describe('A title for the remediation plan.'),
  remediationSteps: z.array(RemediationStepSchema).describe('A list of actionable steps to remediate the NUKED item.'),
  summary: z.string().optional().describe('A brief summary of the overall remediation plan and its goal.'),
});
export type GenerateRemediationPlanOutput = z.infer<typeof RemediationPlanOutputSchema>;

export async function generateRemediationPlan(input: GenerateRemediationPlanInput): Promise<GenerateRemediationPlanOutput> {
  return generateRemediationPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRemediationPlanPrompt',
  input: { schema: NukedItemInputSchema },
  output: { schema: RemediationPlanOutputSchema },
  prompt: `You are Architect AI, a security and privacy expert. Your task is to analyze a 'NUKED' digital identity item and generate a specific, actionable remediation plan to help the user protect their digital identity and move the item from NUKED to KNOXED.

The remediation plan should consist of clear, step-by-step instructions. Prioritize steps that offer the most impact and security.

Input NUKED Item Details:
Type: {{{type}}}
Description: {{{description}}}
{{#if dataExposed}}Data Exposed: {{{dataExposed}}}. {{/if}}
{{#if context}}Context: {{{context}}}.{{/if}}

Generate a detailed remediation plan following the output schema. Focus on actionable advice that a user can immediately implement.`,
});

const generateRemediationPlanFlow = ai.defineFlow(
  {
    name: 'generateRemediationPlanFlow',
    inputSchema: NukedItemInputSchema,
    outputSchema: RemediationPlanOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
