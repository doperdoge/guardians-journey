import SearchPlayer from './SearchPlayer';

export default function Home() {
    // async function getIGN(formData: FormData){
    //     'use server'
    //     const ign = formData.get('name') as string
    //     const data = await getUsers(ign)
    //     console.log(data)
    // }

  return(
        <div>
            <main>
                <h1>
                    Hello
                </h1>
                <SearchPlayer />
            </main>
        </div>
    );
}

// async function getUsers(ign: string) {

//         const params = new URLSearchParams();
//         params.append("username", ign);
//         try {
//             const response = await fetch(`http://localhost:3000/api?${params}`);
//             const data = await response.json();
//             const results = data.Response.searchResults
//             return results[0].bungieGlobalDisplayName;
//         } catch (error) {
//         console.error(error)
//         }
//     }
