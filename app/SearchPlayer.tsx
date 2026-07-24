"use client";

import React, { useState } from 'react';

export default function SearchPlayer(){
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    let user_membership_id = "";
    let user_membership_type = "";

    async function handleChanges(value: string){
        setSearch(value);
        
        if (value.length < 2) return;


        const params = new URLSearchParams();
        params.append("username", value);

        try {
            const res = await fetch(`http://localhost:3000/api/user?${params}`);
            const data = await res.json();
            // console.log(data.Response.searchResults[0].destinyMemberships);
            // console.log(typeof data.Response.searchResults[0].destinyMemberships)
            setResults(data.Response.searchResults);
        } catch (error) {
            console.error(error)
        }
    }

    async function handleSelect(username: string){
        setSearch(username);
        setResults([]);
        const params = new URLSearchParams();
        params.append("membershipType", user_membership_type);
        params.append("membershipID", user_membership_id)

        try {
            const res = await fetch(`http://localhost:3000/api/user-data?${params}`);
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error)
        }
    }

    function setID(userData = []){
        for(let i = 0; i < userData.length; i++){
            if(userData[i].membershipType == userData[i].crossSaveOverride){
                user_membership_id = `${userData[i].membershipId}`;
                user_membership_type = `${userData[i].membershipType}`;
                console.log(typeof user_membership_id);
                console.log(typeof user_membership_type);
                break;
            }
        }
    }

    return(
        <div>
            <form>
                <input 
                    name='name'
                    value={search}
                    onChange={(e) => handleChanges(e.target.value)}
                />
                <ul>
                    {results.map((user) => (
                        <li 
                            key={user.bungieGlobalDisplayNameCode}
                            onClick={
                                        () => {
                                            setID(user.destinyMemberships);
                                            handleSelect(user.bungieGlobalDisplayName + "#" + user.bungieGlobalDisplayNameCode)
                                        }
                                    }
                        >
                            {user.bungieGlobalDisplayName + "#" + user.bungieGlobalDisplayNameCode}
                        </li>
                    ))}

                </ul>
            </form>
        </div>
    );
}