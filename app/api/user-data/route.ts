import { NextRequest } from 'next/server';

require('dotenv').config()

const apiKey = process.env.APIKEY
const headers = {
      "X-API-Key": apiKey
    }

export async function GET(request: NextRequest){
    // Parse the request body
  const searchParams = request.nextUrl.searchParams;
  const membershipType = searchParams.get('membershipType');
  const membershipId = searchParams.get('membershipID');

  // Destiny2.GetHistoricalStatsForAccount API Call
  const historical_stats = await fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Stats/?definition=true`,{
    method: "GET",
    headers,
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
  const user_data = [];

  // Destiny2.GetDestinyManifest
  const manifest = await fetch(`https://www.bungie.net/Platform/Destiny2/Manifest/`,{
    method: "GET",
    headers, 
  });

  const manifestData = await manifest.json();

  for(let i = 0; i < user_characters.length; i++){
    if(user_characters[i].deleted == true ) continue;

    

    const [actHist, aggStats, wepStats] = await Promise.all([
      // fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${user_characters[i].characterId}/Stats/UniqueWeapons/`, {headers}),
      fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${user_characters[i].characterId}/Stats/Activities/`, {headers}),
      fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${user_characters[i].characterId}/Stats/AggregateActivityStats/`, {headers}),
      fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${user_characters[i].characterId}/Stats/UniqueWeapons/`, {headers}),
    ]);

    const [actHistData, aggStatsData, wepStatsData] = await Promise.all([
      // histStats.json(),
      actHist.json(),
      aggStats.json(),
      wepStats.json(),
    ]);

    // console.log(histStatsData);
    console.log(actHistData);
    console.log(aggStatsData);
    console.log(wepStatsData);

    user_data.push({
      activityHistory: actHistData,
      aggregateStats: aggStatsData,
      weaponsStats: wepStatsData,
      manifests: manifestData
    })
  }

  return new Response(JSON.stringify(user_data[0]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function processProfileData(){

}
