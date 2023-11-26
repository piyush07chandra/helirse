import './Userlist.css'
import Pagination from './Pagination';

import  { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://backendserver-1fai.onrender.com');
        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setSelectedAvailability(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedDomain === '' || user.domain === selectedDomain) &&
    (selectedGender === '' || user.gender === selectedGender) &&
    (selectedAvailability === '' || user.available === selectedAvailability)
  );

  const handleAddToTeam = (userId) => {
    const selectedUser = users.find(user => user._id === userId);
    const isDomainAvailable = !teamMembers.some(member => member.domain === selectedUser.domain);
    const isAvailabilityAvailable = !teamMembers.some(member => member.available === selectedUser.available);

    if (isDomainAvailable && isAvailabilityAvailable) {
      setTeamMembers([...teamMembers, selectedUser]);
      alert("added to the Team")
    } else {
      alert('Selected user has the same domain or availability as an existing team member.');
    }
  };
  
  const handleRemoveFromTeam = (userId) => {
    const updatedTeam = teamMembers.filter(member => member._id !== userId);
    setTeamMembers(updatedTeam);
  };
  

  const itemsPerPage = 20;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


  return (
    <>
    <div className="user-list-container">
      <h2 className='text-4xl text-center'>Users</h2>
      <input
      className='w-52 h-9 text-xl mt-2 mb-4  rounded-lg bg-red-500 text-black placeholder:text-black font-semibold '
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}/>
      <div className=' grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
      <div>
        <label >Domain:</label>
        <select className='hover:bg-red-300' value={selectedDomain} onChange={handleDomainChange}>
          <option  value="">All</option>
          <option  value="Sales">Sales</option>
          <option  value="Finance">Finance</option>
          <option  value="Marketing">Marketing</option>
          <option  value="IT">IT</option>
          <option  value="Management">Management</option>
          <option  value="UI Designing">UI Designing</option>
          <option  value="Business Development">Business Development</option>
        </select>
      </div>
      <div>
        <label>Gender:</label>
        <select className='hover:bg-red-300' value={selectedGender} onChange={handleGenderChange}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Agender">Agender</option>
        </select>
      </div>
      <div>
        <label>Availability:</label>
        <select className='hover:bg-red-300' value={selectedAvailability} onChange={handleAvailabilityChange}>
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
        onPageChange={handlePageChange}/> 
     
      {currentUsers.map(user => (
        <div  key={user._id} className="user-card ">
        <div className=''>
        <div className=''>
        <img className='h-32 w-32' src={user.avatar}/>
          <h3>{user.first_name} {user.last_name}</h3>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Domain: {user.domain}</p>
          <p>Availability: {user.available}</p>
          <button className='bg-black text-white p-1 rounded-md hover:text-black hover:bg-green-300' onClick={() => handleAddToTeam(user._id)}>Add to Team</button>
          </div>
          </div>
          
        </div>
      ))}
      

      <div className="team-section text-lg">
        <h2 className='text-2xl text-center font-semibold'>Team Details</h2>
        {teamMembers.length === 0 ? (
          <p>No team members selected.</p>
        ) : (
          <div className=' flex'>
            {teamMembers.map(member => (
              <div className='team ml-4' key={member._id}>
              <img src={member.avatar}/>
                <h1>{member.first_name}  {member.last_name}</h1>
                 <button className=' bg-black text-white p-1 rounded-2xl hover:text-black hover:bg-green-300' onClick={() => handleRemoveFromTeam(member._id)}>Remove from Team</button> 
              </div>
             
            ))}
          </div>
        )}
      </div>

    </div>
    </>
  );
};


export default UserList;