// import logo from './logo.svg';
import './App.css';
import NewElection from './pages/NewElection';
import Header from './components/Header';
import VoterLogin from './pages/VoterLogin';
import ActiveElections from './pages/ActiveElections';
import CreateNewElection from './pages/CreateNewElection';
import ElectionResult from './pages/ElectionResult';
import CastVote from './pages/CastVote';
import Footer from './components/Footer';
import Home from './pages/Home';
import VoterPortal from './pages/VoterPortal';
import VotingArea from './pages/VotingArea';
import AdminPortal from './pages/AdminPortal';
import VoteSuccess from './pages/VoteSuccess';
import ElectionCreationSuccess from './pages/ElectionCreationSuccess';
import VoterCreationSuccess from './pages/VoterCreationSuccess';
import {
  // createBrowserRouter,
  // RouterProvider,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/new-election' element={<NewElection />} />
        <Route path='/login' element={<VoterLogin />} />
        <Route path='/active-elections' element={<ActiveElections />} />
        <Route path='/create-new-election' element={<CreateNewElection />} />
        <Route path='/election-result' element={<ElectionResult />} />
        <Route path='/cast-vote' element={<CastVote />}/>
        <Route path='/voter-portal' element={<VoterPortal />} />
        <Route path='/voting-area' element={<VotingArea />}/>
        <Route path='/admin-portal' element={<AdminPortal />}/>
        <Route path='/vote-success' element={<VoteSuccess />}/>
        <Route path='/election-creation-success' element={<ElectionCreationSuccess />}/>
        <Route path='/voter-creation-success' element={<VoterCreationSuccess />}/>
      </Routes>
      <Footer/>
    </div>

    // Voting system login page
    
    
  );
}

export default App
