import React, { useState } from "react";

interface NearTourProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const NearTour: React.FC<NearTourProps> = ({ value, onChange }) => {
  const [todos, setTodos] = useState(value); // State untuk menyimpan daftar todos
  const [newTodo, setNewTodo] = useState(""); // State untuk nilai baru yang akan ditambahkan

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value); // Memperbarui nilai state newTodo saat input berubah
  };

  const handleAddTodo = () => {
    // Menambahkan nilai baru ke dalam array todos
    if (newTodo !== "") {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      onChange(updatedTodos);
      setNewTodo(""); // Mengosongkan nilai input setelah ditambahkan
    }
  };

  return (
    <div>
      <h1>NearTour</h1>

      <input
        placeholder="Wisata terdekat"
        type="text"
        value={newTodo}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTodo}>Tambah</button>
      <div>
        {todos.map((todo, index) => (
          <ul key={index}>
            <li>{todo}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default NearTour;
