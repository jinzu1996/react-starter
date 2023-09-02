import { useEffect, useState } from "react";
import "./App.css";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [students, setstudent] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const student = { name, age: parseInt(age) };
    await addDoc(collection(db, "students"), student);
    setage("");
    setname("");
    getstudents();
  };

  const getstudents = async () => {
    const q = query(collection(db, "students"));
    const querySnapshot = await getDocs(q);
    let student = [];
    querySnapshot.forEach((doc) => {
      student.push({ ...doc.data(), id: doc.id });
    });
    setstudent(student);
  };

  const editstudent = async (id,name,age) => {
   // const q = query(collection(db, "students"));
    await updateDoc(doc(db, "students" ,id),
    {name,age : parseInt(age)
    })
    getstudents();
  };

  const deletestudent = async (id) => {
    // const q = query(collection(db, "students"));
     await deleteDoc(doc(db, "students" ,id));
     getstudents();
   };

  useEffect(() => {
    getstudents();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="heading">CRUD operation and Firebase with React</h1>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="name">Age:</label>
            <input
              type="text"
              id="age"
              value={age}
              onChange={(e) => {
                setage(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="btn">
            Add Student
          </button>
        </form>
        <div className="students">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>
                    <button className="btn" onClick={()=> editstudent(student.id, prompt("Enter new name",student.name),prompt("Enter new age",student.age))}>Edit</button>
                    <button className="btn" onClick={()=> deletestudent(student.id)}>Delete</button>
                  </td>
                  <td></td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
