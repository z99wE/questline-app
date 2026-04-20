import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { model, ORACLE_SYSTEM_PROMPT } from "@/lib/gemini";

/**
 * POST /api/oracle
 * Endpoint for the AI Oracle chatbot.
 * Handles mission advice, crowd management tactic, and tactical logistics.
 */
export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    // 0. Environment Validation
    if (!process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_AI_API_KEY === '[YOUR_KEY]') {
      return NextResponse.json({ 
        error: "MISSION ERROR: Oracle API Key not found in environment. Check deployment configuration." 
      }, { status: 500 });
    }

    // 1. Input Validation & Sanitization
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: "Missing or invalid message." }, { status: 400 });
    }

    // Limit message length to prevent resource abuse
    const sanitizedMsg = message.slice(0, 500).replace(/[<>]/g, ''); 

    // 2. Oracle Interaction
    // We send a combined prompt with world context and the user message
    const prompt = `
SYSTEM DIRECTIVE: ${ORACLE_SYSTEM_PROMPT}
CURRENT MISSION CONTEXT: ${JSON.stringify(context || {})}
COMMANDER MESSAGE: ${sanitizedMsg}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("Oracle API Error:", error);
    // Unmask common Gemini errors (Quota, Billing, Safety) for the user during this fix phase
    const errorMsg = error?.message || "Unknown Oracle Failure";
    return NextResponse.json({ 
      error: `ERROR: The Oracle is currently clouded. (${errorMsg})`
    }, { status: 500 });
  }
}
