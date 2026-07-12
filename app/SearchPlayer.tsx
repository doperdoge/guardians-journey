"use client";

import React, { useState } from 'react';

export default function SearchPlayer(){
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    let user_membership_id = 0;

    async function handleChanges(value: string){
        setSearch(value);
        
        if (value.length < 2) return;


        const params = new URLSearchParams();
        params.append("username", value);

        try {
            const res = await fetch(`http://localhost:3000/api/user?${params}`);
            const data = await res.json();
            console.log(data.Response);
            setResults(data.Response.searchResults);
        } catch (error) {
            console.error(error)
        }
    }

    function handleSelect(username: string){
        setSearch(username);
        setResults([]);
    }

    function setID(userID: number){
        user_membership_id = userID;
        console.log(user_membership_id);
    }

    return(

                // {/* <form action={getIGN}>
                //     <input type="text" name="name" placeholder="Input Username"/>
                //     <button type="submit">Enter</button>
                // </form> */}
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
                                            handleSelect(user.bungieGlobalDisplayName + "#" + user.bungieGlobalDisplayNameCode);
                                            setID(user.destinyMemberships[0].membershipId as number)
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