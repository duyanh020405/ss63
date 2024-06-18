import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Show.css'; // Import your CSS file

interface Data {
  id: number;
  title: string;
  image: string;
  checked: boolean;
  statut:string;

}

export default function Show() {
  const [list, setList] = useState<Data[]>([])
  const [day, setDay] = useState<string>(new Date().toString())

  useEffect(() => {
    axios.get("http://localhost:8080/posts")
      .then(response =>{ setList(response.data)})
  }, []);

  const block = (id: number) => {
    const updatedList = list.map(item => {
      if (item.id === id) {
        if (!item.checked) {
          return {
            ...item,
            checked: true,
            statut: "Da chan"
          };
        } else {
          alert("Bạn đã chặn post này rồi");
        }
      }
      return item;
    });
    setList(updatedList);
    
  };
  const change = (id: number) => {
    let newName = prompt("Enter name");
    let newImage = prompt("Enter new image link");
    let newDay = prompt("Enter new day");
  
    if (newName || newImage || newDay) {
      const updatedList = list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            title: newName || item.title,
            image: newImage || item.image,
          };
        }
        return item;
      });
      setList(updatedList);
    }
  };
  const delete1 = (id: number) => {
    axios.delete(`http://localhost:8080/posts/${id}`)
      .then(response => {
        const updatedList = list.filter(item => item.id !== id);
        setList(updatedList)
      })
      .catch(error => {
        console.error("Error deleting post:", error);
      });
  };
  

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Name</th>
            <th>Image</th>
            <th>Day</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td className="image-cell"><img src={item.image} alt={item.title} width="50" /></td>
              <td>{day}</td>
              <td>{item.statut}</td>
              <td className="actions-cell">
                <button onClick={() => block(item.id)}>Chan</button>
                <button onClick={()=> change(item.id)}>Sua</button>
                <button onClick={()=> delete1(item.id)}>Xoa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
