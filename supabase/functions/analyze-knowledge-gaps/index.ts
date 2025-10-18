import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studyContent, questionResults } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Format the question results for analysis
    const resultsText = questionResults.map((r: any, idx: number) => `
Question ${idx + 1}: ${r.question}
Student's Answer: ${r.answer}
Score: ${r.score}/${r.maxMarks}
Key Ideas Covered: ${r.keyIdeasCovered.join(", ") || "None"}
Key Ideas Missed: ${r.keyIdeasMissed.join(", ") || "None"}
`).join("\n---\n");

    const systemPrompt = `You are an expert GCSE chemistry tutor analyzing a student's performance to identify knowledge gaps.
Your task is to:
1. Review the student's answers to multiple questions
2. Identify patterns in what they understand well and what they struggle with
3. Provide specific, actionable recommendations for improvement
4. Focus on conceptual understanding, not just memorization
5. Return a JSON response with this structure:
{
  "overallAssessment": "Brief overview of their performance",
  "strengths": ["strength 1", "strength 2", ...],
  "knowledgeGaps": [
    {
      "topic": "Topic name",
      "issue": "What they're struggling with",
      "recommendation": "Specific advice on how to improve"
    },
    ...
  ],
  "nextSteps": ["action 1", "action 2", ...]
}`;

    const userPrompt = `Study Content:
${studyContent}

Student's Performance:
${resultsText}

Analyze this student's performance and identify their knowledge gaps and areas for improvement.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the JSON response from AI
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Could not parse AI response:", aiResponse);
      throw new Error("Invalid AI response format");
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-knowledge-gaps function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
