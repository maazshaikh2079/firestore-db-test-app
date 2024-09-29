import './App.css';
import { useState, useEffect } from 'react';
import { db } from "./firebase-config.js";

import { 
  collection, 
  getDocs,   // R
  addDoc,    // C
  updateDoc, // U
  doc,       // U
  deleteDoc  // D
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  }

  const editUser = async (id) => {
    const nameInput = prompt("Enter name:");
    const ageInput = parseInt(prompt("Enter age:"));
  
    const userDoc = doc(db, "users", id);

    const newFields = { name: nameInput, age: ageInput };
    await updateDoc(userDoc, newFields);
  };

  const editUserName = async (id) => {
    const nameInput = prompt("Enter name:");
  
    const userDoc = doc(db, "users", id);

    const newFields = { name: nameInput };
    await updateDoc(userDoc, newFields);
  };

  const editUserAge = async (id) => {
    const ageInput = parseInt(prompt("Enter age:"));
  
    const userDoc = doc(db, "users", id);

    const newFields = { age: ageInput };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(users);
    };
    getUsers();
  },[]);

  return (
    <div className="App">
      <input placeholder="Name..." onChange={(event) => {
        setNewName(event.target.value);
      }}
      /><br/>
      <input type="number" placeholder="Age..." onChange={(event) => {
        setNewAge(event.target.value);
      }}/><br/>
      <button onClick={createUser}>Create User</button><br/><br/>

      {
        users.map((user) => {
          return (
            <div>
              <b>Name : {user.name}</b> 
              <button onClick={() => {editUserName(user.id)}}>🖍</button> <br/>
              
              <b>Age : {user.age}</b> 
              <button onClick={() => {editUserAge(user.id)}}>🖍</button> <br/>
              
              <button onClick={() => {editUser(user.id)}}> Edit </button>
              <button onClick={() => {deleteUser(user.id)}}> Delete </button>
              <br/><br/>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
