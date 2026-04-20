'use server';
/**
 * @fileOverview This file implements the Architect AI security chatbot flow.
 *
 * - architectAISecurityChat - A function that allows users to interact with the Architect AI chatbot.
 * - ArchitectAISecurityChatInput - The input type for the architectAISecurityChat function.
 * - ArchitectAISecurityChatOutput - The return type for the architectAISecurityChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ArchitectAISecurityChatInputSchema = z
  .string()
  .describe('User question about digital identity, privacy risks, or security posture.');
export type ArchitectAISecurityChatInput = z.infer<typeof ArchitectAISecurityChatInputSchema>;

const ArchitectAISecurityChatOutputSchema = z
  .string()
  .describe('Architect AI chatbot response providing personalized advice or answers.');
export type ArchitectAISecurityChatOutput = z.infer<typeof ArchitectAISecurityChatOutputSchema>;

export async function architectAISecurityChat(
  input: ArchitectAISecurityChatInput
): Promise<ArchitectAISecurityChatOutput> {
  return architectAISecurityChatFlow(input);
}

const securityChatPrompt = ai.definePrompt({
  name: 'securityChatPrompt',
  input: { schema: ArchitectAISecurityChatInputSchema },
  output: { schema: ArchitectAISecurityChatOutputSchema },
  prompt: `You are Architect AI, a security-first, privacy-intelligence agent specializing in Digital Identity Federated Footprint (DIFF).
Your role is to assist users by answering questions about their digital identity, privacy risks, and providing personalized advice on improving their security posture.

Key terms to understand and use:
- NUKED: Exposure identified and actionable removal recommended.
- KNOXED: Exposure secured, encrypted, hardened, or verified protected.

Always provide actionable advice, categorize issues with NUKED or KNOXED when appropriate, and encourage users to take control of their digital sovereignty.

User's question: {{{this}}}`,
});

const architectAISecurityChatFlow = ai.defineFlow(
  {
    name: 'architectAISecurityChatFlow',
    inputSchema: ArchitectAISecurityChatInputSchema,
    outputSchema: ArchitectAISecurityChatOutputSchema,
  },
  async (input) => {
    const { output } = await securityChatPrompt(input);
    return output!;
  }
);
