import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const getCandidate = async () => {
    setLoading(true);
    setError('');

    try {
      const users = await searchGithub();
      if (users.length > 0) {
        await getDetails(users[0].login);
      } else {
        setError('No One Available')
      }
    } catch (err) {
      setError('Cannot Get Candidate')
    } finally {
      setLoading(false);
    }
  };

  const getDetails = async (username: string) => {
    try {
      const candidateDetails = await searchGithubUser(username);
      setCurrentCandidate({
        username: candidateDetails.login,
        name: candidateDetails.name,
        location: candidateDetails.location || 'N/A',
        avatar_url: candidateDetails.avatar_url,
        email: candidateDetails.email || 'N/A',
        html_url: candidateDetails.html_url,
        company: candidateDetails.company || 'N/A',
      });
    } catch (err) {
      setError('Cannot Load')
    }
  };
  const saveCandidate = () => {
    if (currentCandidate) {
      const savedCandidate = JSON.parse(localStorage.getItem('savedCandidates') || '[]')
      savedCandidate.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidate));
    } getCandidate();
  };

  const skipUser = () =>{
    getCandidate();
  };

  useEffect(() => {
    getCandidate();
  }, []);

  if (loading) return <p>Loading Candidates...</p>;
  if (error) return <p>{error}</p>;
  if (!currentCandidate) return <p>No Candidates</p>;

  return (
    <div>
      <h1>CANDIDATE SEARCH</h1>
      <div className='candidate-card'>
        <img src={currentCandidate?.avatar_url}/>
        <h4>{currentCandidate?.name}</h4>
        <p>Username: {currentCandidate?.username}</p>
        <p>Location: {currentCandidate?.location}</p>
        <p>Company: {currentCandidate?.company}</p>
        <p>E-Mail: {currentCandidate?.email}</p>
        <a href = {currentCandidate?.html_url} target='_blank' rel='noopener noreferrer'>
          View Profile
        </a>
        <div>
          <button onClick={saveCandidate}>Add</button>
          <button onClick={skipUser}>Skip</button>
        </div>
      </div>
    </div>
  )

};

export default CandidateSearch;
