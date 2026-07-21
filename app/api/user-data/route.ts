import { NextRequest } from 'next/server';

require('dotenv').config()

const apiKey = process.env.APIKEY

export async function GET(request: NextRequest){
    // Parse the request body
  const searchParams = request.nextUrl.searchParams;
  const membershipType = searchParams.get('membershipType')
  const membershipId = searchParams.get('membershipID')

  // Destiny2.GetHistoricalStatsForAccount API Call
  const historical_stats = await fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Stats/`,{
    method: "GET",
    headers: {
        "X-API-Key": apiKey
    },
  });

  // Destiny2.GetLinkedProfiles
  const profiles = await fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/LinkedProfiles/`,{
    method: "GET",
    headers: {
        "X-API-Key": apiKey
    },
  });

  //

  const data = await historical_stats.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}


