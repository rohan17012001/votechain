import React from 'react'
export default function NewElection() {
    const [election, setElection]=React.useState({
        electionName:"",
        noOfCandidates:""
    })
    function assignElection(event){
        const {name, value}=event.target
        setElection(prevLogin => ({
            ...prevLogin,
            [name]:value
        }))
    }
    return (
        <div className='new-election'>
            <h3>New Election</h3>
            <form className='voter-login-form'>
                <div class="mb-3">
                    <label for="electionName" class="form-label">Election Name</label>
                    <input type="text" 
                        class="form-control" 
                        id="electionName"
                        value={election.electionName}
                        onChange={assignElection} 
                    />
                </div>
                <div class="mb-3">
                    <label for="candidateRange" class="form-label">Number of candidates</label>
                    {/* <input type="number" class="form-control quantity text-center" min="1" max="10" step="1" name="quantity" id="candidateRange" value="1" /> */}
                    <input type="number" 
                        className="form-control quantity text-center" 
                        id="candidateRange" 
                        name="quantity" 
                        min="1" 
                        max="10"
                        value={election.noOfCandidates}
                        onChange={assignElection}
                    />
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}