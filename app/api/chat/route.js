import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const { message } = await req.json();
    
    console.log("Received message:", message); // Debugging line

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = await response.text();

    console.log("Gemini API response:", text); // Debugging line

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Failed to communicate with Gemini API' }, { status: 500 });
  }
}



// // app/api/chat/route.js

// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   const { message } = await request.json();
//   // Handle message processing with Gemini API here
//   return NextResponse.json({ response: 'Response from API' });
// }
