'use client';

import React, { useState } from "react";
import { useData } from "@/app/_component/DataProvider";

const Edit = ({ params }: { params: { id: number } }) => {
    const { id } = params; // remove Promise from params, Netlify can't handle that
    const { state, dispatch } = useData();

    const student = state.students[id];

    const [data, setData] = useState(student || { name: "", age: 0, email: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleUpdate = () => {
        dispatch({ type: 'update', payload: { index: id, data: data } });
        console.log("Data has been updated");
    }

    if (!student) {
        return <p>No record for edit</p>;
    }

    return (
        <>
            <h2>Edit Record of having id = {id}</h2>
            Name : <input type="text" name="name" value={data.name} onChange={handleChange} /><br />
            Age : <input type="number" name="age" value={data.age} onChange={handleChange} /><br />
            Email : <input type="email" name="email" value={data.email} onChange={handleChange} /><br />
            <input type="button" value="Update" onClick={handleUpdate} />
        </>
    );
}

export default Edit;
