import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobApplications } from '../api';

export default function JobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('access')) {
      navigate('/login');
      return;
    }

    getJobApplications()
      .then((data) => setJobs(data.results ?? data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  }

  return (
    <div className="page">
      <div className="header-row">
        <h1>Job Applications</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 && (
              <tr>
                <td colSpan="5">No job applications yet.</td>
              </tr>
            )}
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.company_name}</td>
                <td>{job.position}</td>
                <td>{job.status}</td>
                <td>{job.applied_date}</td>
                <td>{job.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
