import React, { useState, useEffect } from 'react';
import './Creat.css';
import axios from 'axios';

interface Data {
  title: string;
  image: string;
  content: string;
  checked: boolean;
  id: number;
  statut:string
}

export default function Creat() {
  const [formData, setFormData] = useState<Data>({
    title: '',
    image: '',
    content: '',
    checked: false,
    id: 0,
    statut:"Chua chan"
  });
  const [list, setList] = useState<Data[]>([]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFetch = () => {
    axios.get("http://localhost:8080/posts")
      .then(response => {
        setList(response.data);
        setFormData(prevData => ({ ...prevData, id: response.data.length + 1 }));
      })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = list.length + 1;
    const updatedFormData = { ...formData, id: newId };
    axios.post("http://localhost:8080/posts", updatedFormData)
      .then(response => {
        const newPost = response.data;
        setList(prevList => [...prevList, newPost]);
        setFormData({ title: '', image: '', content: '', checked: false, id: newId + 1 ,statut :"Chua chan"});
      })
      .catch(error => console.error("There was an error submitting the data!", error));
  };

  const handleReset = () => {
    setFormData({ title: '', image: '', content: '', checked: false, id: list.length + 1 ,statut: "Chua chan"});
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Them bai viet moi</h2>
        <br />
        <b>Ten bai viet</b>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
        />
        <b>Hinh anh</b>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="input-field"
        />
        <b>Noi dung</b>
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="input-field"
        />
        <button type="reset" className="reset-button" onClick={handleReset}>Lam moi</button>
        <button type="submit" className="submit-button">Xuat ban</button>
      </form>
    </div>
  );
}

