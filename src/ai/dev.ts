import { config } from 'dotenv';
config();

import '@/ai/flows/generate-remediation-plan.ts';
import '@/ai/flows/architect-ai-security-chat.ts';
import '@/ai/flows/generate-diff-summary.ts';