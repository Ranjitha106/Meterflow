import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }
        try {
            await api.post('/auth/signup', { 
                email: formData.email, 
                password: formData.password 
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Try a different email.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            
            <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-400">Join MeterFlow 🚀</h1>
                    <p className="text-slate-400 mt-2">
                        Create an account to start metering your APIs
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm border border-red-500/20">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="name@company.com"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Password
                        </label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-200 mt-2"
                    >
                        Create Account
                    </button>
                </form>
                
                <p className="text-center text-slate-400 text-sm mt-6">
                    Already have an account? 
                    <Link to="/login" className="text-indigo-400 font-medium hover:underline ml-1">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;