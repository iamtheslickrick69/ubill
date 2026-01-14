export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface BillData {
  totalAmount?: number;
  kwhUsage?: number;
  ratePerKwh?: number;
  billingPeriod?: string;
  accountNumber?: string;
  utilityCompany?: string;
  charges?: Array<{
    name: string;
    amount: number;
  }>;
}

const SYSTEM_PROMPT = `You are an expert energy bill analyst and solar advisor at Ubill.io. Your role is to help homeowners understand their utility bills and make informed decisions about energy usage and solar.

Key responsibilities:
1. Explain utility bill charges in simple, clear language
2. Help users understand their energy consumption patterns
3. Provide honest, objective advice about whether solar makes sense for their situation
4. Never push sales - focus on education and transparency
5. Break down complex rate structures into understandable terms
6. Calculate actual cost per kWh when given bill data

When analyzing bills:
- Look for baseline vs. tier charges
- Identify time-of-use patterns if applicable
- Explain delivery charges vs. generation charges
- Point out any fees or credits

Be friendly, conversational, and educational. Use analogies when helpful. Always be honest - if solar doesn't make sense for someone, tell them.`;

export async function sendChatMessage(
  messages: ChatMessage[],
  billData?: BillData
): Promise<string> {
  const systemPrompt = billData
    ? `${SYSTEM_PROMPT}\n\nUser's current bill data:\n${JSON.stringify(billData, null, 2)}`
    : SYSTEM_PROMPT;

  const response = await fetch('/api/anthropic/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to get response from Claude');
  }

  const data = await response.json();
  return data.content[0]?.text || 'I apologize, but I was unable to generate a response.';
}

export async function analyzeBillImage(imageBase64: string): Promise<BillData> {
  // Extract base64 data if it's a data URL
  const base64Data = imageBase64.startsWith('data:')
    ? imageBase64.split(',')[1]
    : imageBase64;

  // Determine media type
  const mediaType = imageBase64.includes('image/png') ? 'image/png' : 'image/jpeg';

  const response = await fetch('/api/anthropic/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Data,
              },
            },
            {
              type: 'text',
              text: `You are an expert at reading and parsing utility bills. Extract the following information from the bill image and return it as JSON:
{
  "totalAmount": number (total amount due),
  "kwhUsage": number (total kWh used),
  "ratePerKwh": number (calculated average rate per kWh),
  "billingPeriod": string (e.g., "Nov 1 - Dec 1, 2024"),
  "accountNumber": string,
  "utilityCompany": string,
  "charges": [
    { "name": string, "amount": number }
  ]
}

Only return valid JSON, no other text. If you cannot find a value, use null.`,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to analyze bill');
  }

  const data = await response.json();
  const content = data.content[0]?.text || '{}';

  try {
    // Clean up the response in case it has markdown code blocks
    const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(jsonStr);
  } catch {
    console.error('Failed to parse bill analysis:', content);
    return {};
  }
}
