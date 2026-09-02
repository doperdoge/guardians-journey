import { NextRequest } from 'next/server';

require('dotenv').config()

const apiKey = process.env.APIKEY



export async function GET(request: NextRequest){
  // checks to see if there is an api key
  if (!apiKey){
      throw new Error("APIKEY not configured");
  }

    // Parse the request body
  const searchParams = request.nextUrl.searchParams;
  const res = await fetch("https://www.bungie.net/Platform/User/Search/GlobalName/0/",{
    method: "POST",
    headers:{
        "X-API-Key": apiKey
    },
    body: JSON.stringify({displayNamePrefix: searchParams.get('username')}),
  });
 
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}


