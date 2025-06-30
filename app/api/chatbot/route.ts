import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
export const runtime = 'edge'
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = await model.generateContent(prompt);
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to generate content! because ${error}` },
      { status: 500 }
    );
  }
}

