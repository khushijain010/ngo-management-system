"use client";
import React, { useState } from 'react';

export default function DonationPage() {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = {
      amount,
      firstName: (target.elements.namedItem('first_name') as HTMLInputElement).value,
      email: (target.elements.namedItem('email') as HTMLInputElement).value,
      phone: (target.elements.namedItem('phone') as HTMLInputElement).value,
    };

    const res = await fetch('http://localhost:5000/api/donations/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.payhere.lk/pay/checkout';
      Object.entries(data.params).forEach(([key, val]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = val as string;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-black text-blue-600 mb-2">HOPE NGO</h1>
        <p className="text-gray-500 mb-8">Your support changes lives.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            {[1000, 5000].map(v => (
              <button key={v} type="button" onClick={() => setAmount(v.toString())} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition">
                {v}
              </button>
            ))}
          </div>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (LKR)" className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required />
          <input name="first_name" placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-xl outline-none" required />
          <input name="email" type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 rounded-xl outline-none" required />
          <input name="phone" placeholder="Phone Number" className="w-full p-4 bg-gray-50 rounded-xl outline-none" required />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition">Donate Now</button>
        </form>
      </div>
    </div>
  );
}