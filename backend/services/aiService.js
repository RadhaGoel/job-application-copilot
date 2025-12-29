import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAISuggestions(resumeText, jobDescription) {
  const prompt = `
You are a career coach.

Based on the resume and job description below,
give 4 clear suggestions to improve the resume
so it matches the job better.

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond in bullet points.
`;

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
