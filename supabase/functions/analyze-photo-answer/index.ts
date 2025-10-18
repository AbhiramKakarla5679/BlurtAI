import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, studyContent, questions } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing photo with Lovable AI...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a supportive GCSE teacher analyzing a student's handwritten answers to blurting questions. 
            
Your task:
1. First, transcribe EXACTLY what the student wrote (word for word, including any mistakes or unclear writing)
2. Compare their answer against the study content and questions provided
3. Identify key ideas they covered and key ideas they missed
4. Provide specific, constructive feedback

Be encouraging but honest. Point out specific concepts they understood well and areas needing improvement.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Study Content:\n${studyContent}\n\nQuestions Asked:\n${questions.join('\n')}\n\nPlease analyze the student's handwritten answers in the image.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_student_answer",
              description: "Analyze the student's answer and provide structured feedback",
              parameters: {
                type: "object",
                properties: {
                  extractedText: {
                    type: "string",
                    description: "The exact text transcribed from the student's handwritten answer"
                  },
                  keyIdeasCovered: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of key ideas the student correctly included"
                  },
                  keyIdeasMissed: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of key ideas the student missed or got wrong"
                  },
                  feedbackText: {
                    type: "string",
                    description: "Detailed feedback on the student's answer"
                  }
                },
                required: ["extractedText", "keyIdeasCovered", "keyIdeasMissed", "feedbackText"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "analyze_student_answer" } }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI API error:', error);
      throw new Error('Failed to analyze photo');
    }

    const data = await response.json();
    const toolCall = data.choices[0].message.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No tool call in response');
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );

  } catch (error) {
    console.error('Error in analyze-photo-answer:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});