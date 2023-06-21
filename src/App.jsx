
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);

  //fetch data
  useEffect(() => {
    fetch('http://localhost:5000/users ')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  console.log(users);


  const handleAddUser = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }; //create new user object and pass to backend
    console.log(user);

 //post method
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      })
  }


  return (
    <>
      <h1>USers management system : {users.length}</h1>

      <form onSubmit={handleAddUser} action="">
        <input type="text" name='name' /> <br /><br />
        <input type="text" name='email' /><br /><br />
        <input type="submit" name="" value='add user' id="" />
      </form>



      <div>
        {
          users.map(data => <p>{data.id}  : {data.name}</p>)
        }
      </div>

    </>
  )
}

export default App
