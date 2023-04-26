import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


const VoterCreationSuccess = () => {
    const newid=localStorage.getItem('newid')
    const [newvoter, setNewvoter] = useState([])
    useEffect(()=>{
        getNewvoter()
    },[])
    let getNewvoter=async()=>{
        let response= await fetch(`/api/identifyVoter/`, {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                voter_id:newid
            }),
          });
          let data=await response.json()
          console.log(data)
          setNewvoter(data)
    }
  return (
    <div className='electionsuccess'>
      <h1>Voter created successfully!!!</h1>
      <div className='voterdetails'>
        <h4>Name: {newvoter.name}</h4>
        <h4>Email ID: {newvoter.user_email}</h4>
      </div>
      <div>
        <h3>Go back to <Link to={'/login'}>Voter Login Portal</Link></h3>
      </div>
    </div>
  )
}

export default VoterCreationSuccess
