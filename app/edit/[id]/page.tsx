'use client';

import React, { useState } from "react";
import { useData } from "@/app/_component/DataProvider";

type PageProps = {
  params: {
    id: string;
  };
};

const Edit = ({ params }: PageProps) => {
  const id = parseInt(params.id); // Convert string to number
  const { state, dispatch } = useData();

  if (!state.students[id]) {
    return <p>No record for edit</p>;
  }

  const [data, setData] = useState(state.students[id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch({ type: 'update', payload: { index: id, data: data } });
    console.log("Data has been updated");
  };

  return (
    <>
      <h2>Edit Record of having id={id}</h2>
      Name: <input type="text" name="name" value={data.name} onChange={handleChange} /><br />
      Age: <input type="number" name="age" value={data.age} onChange={handleChange} /><br />
      Email: <input type="email" name="email" value={data.email} onChange={handleChange} /><br />
      <input type="button" value="Update" onClick={handleUpdate} />
    </>
  );
};

export default Edit;
