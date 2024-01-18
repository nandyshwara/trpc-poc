import React from 'react'
import ReactDOM from 'react-dom/client'
import { client } from './client';

const getUserById = async(id : string)=>{
  const data = await client.user.getById.query({user_id : id})
  console.log(data.id);
}
getUserById("2249a53b-7e2b-4f36-98a3-92264c0c1e16")

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <p>Hello</p>
  </React.StrictMode>,
)
