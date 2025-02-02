import { NextResponse, NextRequest } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const SYSTEM_PROMPT = `You are PythonPal, an AI tutor designed to help children learn basic Python coding. Your responses should be:
1. Clear and simple, using language appropriate for children.
2. Encouraging and positive, praising effort and progress.
3. Focused on explaining Python concepts with easy-to-understand examples.
4. Interactive, asking questions to check understanding and engage the child.
5. Safety-conscious, never sharing personal information or inappropriate content.

When explaining code, use simple analogies and real-world examples that children can relate to. If a child seems confused, break down the concept into smaller, more manageable parts.`;

export async function POST(request: NextRequest) {
  const { messages, apiKey } = await request.json();

  const finalApiKey = apiKey || process.env.GEMINI_API_KEY;

  if (!finalApiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 });
  }

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json(
      { error: "Missing or invalid messages in request body" },
      { status: 400 }
    );
  }

  try {
    const conversation = messages.map((m) => m.content).join("\n");
    const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation:\n${conversation}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${finalApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }], // Send the prompt to Gemini API
      }),
    });

    const data = await response.json();
    console.log(data);

    const assistantMessage =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({
      message: { role: "assistant", content: assistantMessage },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
