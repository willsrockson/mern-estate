import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        try {
            setLoading(true);
            event.preventDefault();
            // to send a form to a server stringify it
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), //this is saying send the data from the body in a string format
            });

            const data = await res.json();
            if (data.success == false) {
                setLoading(false);
                setError(data.message);

                return;
            }
            setLoading(false);
            setError(null);
            navigate("/");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Sign in</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:bg-slate-600 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sign in"}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don't have and account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-700">sign up</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
