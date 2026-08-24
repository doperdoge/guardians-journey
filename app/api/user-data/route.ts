import { NextRequest } from 'next/server';

require('dotenv').config()

const apiKey = process.env.APIKEY

export async function GET(request: NextRequest){
    // Parse the request body
  const searchParams = request.nextUrl.searchParams;
  const membershipType = searchParams.get('membershipType');
  const membershipId = searchParams.get('membershipID');

  // Destiny2.GetHistoricalStatsForAccount API Call
  const historical_stats = await fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Stats/`,{
    method: "GET",
    headers: {
        "X-API-Key": apiKey
    },
  });

  // // Destiny2.GetLinkedProfiles *Prob not needed*
  // const profiles = await fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/LinkedProfiles/`,{
  //   method: "GET",
  //   headers: {
  //       "X-API-Key": apiKey
  //   },
  // });

  const profile_data = await historical_stats.json();
  const user_characters  = profile_data.Response.characters;

  for(let i = 0; i < user_characters.length; i++){
    if(user_characters[i].deleted == true ) continue;

    const headers = {
      "X-API-Key": apiKey
    }

    const [histStats, actHist, aggStats, wepStats] = await Promise.all([
      fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${user_characters[i].characterId}/Stats/UniqueWeapons/`, {headers}),
      fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${user_characters[i].characterId}/Stats/Activities/`, {headers}),
      fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${user_characters[i].characterId}/Stats/AggregateActivityStats/`, {headers}),
      fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${user_characters[i].characterId}/Stats/UniqueWeapons/`, {headers}),
    ]);

    const [histStatsData, actHistData, aggStatsData, wepStatsData] = await Promise.all([
      histStats.json(),
      actHist.json(),
      aggStats.json(),
      wepStats.json(),
    ]);

    console.log(histStatsData);
    console.log(actHist);
    console.log(aggStats);
    console.log(wepStats);
  }

  // Destiny2.GetDestinyManifest
  // const accStats = await fetch(`https://www.bungie.net/Platform/Destiny2/Manifest/`,{
  //   method: "GET",
  //   headers: {
  //       "X-API-Key": apiKey
  //   }, 
  // });


  // const data = await accStats.json();
  // console.log(data)
  return new Response(JSON.stringify(profile_data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function processProfileData(){

}
