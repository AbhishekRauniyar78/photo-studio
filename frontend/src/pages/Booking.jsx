import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    price: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages");
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };
    fetchPackages();
  }, []);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setData({
      ...data,
      service: pkg.name,
      price: pkg.price
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!selectedPackage) {
      alert("Please select a package");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", data);
      navigate("/receipt", { state: res.data });
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">
          Book Your Service
        </h2>

        {/* PACKAGE SELECTION */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select a Package *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
            {packages.length === 0 ? (
              <p className="text-gray-500 text-sm col-span-2 text-center py-4">
                No packages available. Please contact admin.
              </p>
            ) : (
              packages.map((pkg) => (
                <div
                  key={pkg._id}
                  onClick={() => handlePackageSelect(pkg)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPackage?._id === pkg._id
                      ? "border-pink-600 bg-pink-50 shadow-md"
                      : "border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{pkg.name}</h3>
                    <span className="text-pink-600 font-bold">₹{pkg.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{pkg.description}</p>
                  {pkg.duration && (
                    <p className="text-xs text-gray-500">Duration: {pkg.duration}</p>
                  )}
                  {selectedPackage?._id === pkg._id && (
                    <div className="mt-2 text-xs text-pink-600 font-semibold">
                      ✓ Selected
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* BOOKING FORM */}
        <form onSubmit={submitHandler}>
          <input 
            type="text"
            placeholder="Your Name *" 
            value={data.name}
            onChange={e => setData({...data, name: e.target.value})}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
          <input 
            type="email"
            placeholder="Email Address *" 
            value={data.email}
            onChange={e => setData({...data, email: e.target.value})}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
          <input 
            type="tel"
            placeholder="Phone Number *" 
            value={data.phone}
            onChange={e => setData({...data, phone: e.target.value})}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
          <input 
            type="date"
            placeholder="Select Date *" 
            value={data.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => setData({...data, date: e.target.value})}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
          
          {/* Selected Package Info */}
          {selectedPackage && (
            <div className="mb-4 p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Selected Package:</span> {selectedPackage.name}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Price:</span> ₹{selectedPackage.price}
              </p>
            </div>
          )}
          
          <button 
            type="submit"
            disabled={!selectedPackage}
            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
              selectedPackage
                ? "bg-pink-600 text-white hover:bg-pink-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedPackage ? "Book Now" : "Please Select a Package"}
          </button>
        </form>
      </div>
    </div>
  );
}
