'use client';
import React, { useState } from "react";
import { useData } from "../_component/DataProvider";

const Input = () => {
    const [data, setData] = useState({ name: "", age: 0, email: "" });
    const { dispatch } = useData();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setData({
            ...data,
            [name]: type === "number" ? Number(value) : value,
        });
    };

    const handleSave = () => {
        // Simple validation
        if (!data.name || !data.email || !data.age) {
            alert("Please fill in all fields");
            return;
        }

        dispatch({ type: 'add', payload: data });
        setData({ name: "", age: 0, email: "" });
        console.log("Data has been saved");
    };

    return (
        <>
            <h2>Input</h2>

            <div>
                Name: <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                Age: <input
                    type="number"
                    name="age"
                    value={data.age}
                    onChange={handleChange}
                />
            </div>

            <div>
                Email: <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <input type="button" value="Save" onClick={handleSave} />
            </div>
        </>
    );
};

export default Input;
