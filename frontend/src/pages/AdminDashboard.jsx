import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" or "packages"
  
  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    price: ""
  });

  // Packages state
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [packageFormData, setPackageFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    features: "",
    image: "",
    category: "wedding"
  });
  const [showPackageModal, setShowPackageModal] = useState(false);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch packages
  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/packages");
      setPackages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchPackages();
  }, []);

  // Booking functions
  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openEditBooking = (booking) => {
    setEditingBooking(booking);
    setBookingFormData({
      name: booking.name || "",
      email: booking.email || "",
      phone: booking.phone || "",
      service: booking.service || "",
      date: booking.date || "",
      price: booking.price || ""
    });
  };

  const updateBooking = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${editingBooking._id}`,
        bookingFormData
      );
      setEditingBooking(null);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // Package functions
  const openAddPackage = () => {
    setEditingPackage(null);
    setPackageFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      features: "",
      image: "",
      category: "wedding"
    });
    setShowPackageModal(true);
  };

  const openEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setPackageFormData({
      name: pkg.name || "",
      description: pkg.description || "",
      price: pkg.price || "",
      duration: pkg.duration || "",
      features: pkg.features ? pkg.features.join(", ") : "",
      image: pkg.image || "",
      category: pkg.category || "wedding"
    });
    setShowPackageModal(true);
  };

  const savePackage = async () => {
    try {
      const packageData = {
        ...packageFormData,
        price: Number(packageFormData.price),
        features: packageFormData.features
          .split(",")
          .map(f => f.trim())
          .filter(f => f.length > 0)
      };

      if (editingPackage) {
        await axios.put(`http://localhost:5000/api/packages/${editingPackage._id}`, packageData);
      } else {
        await axios.post("http://localhost:5000/api/packages", packageData);
      }
      setShowPackageModal(false);
      fetchPackages();
    } catch (err) {
      console.error(err);
      alert("Error saving package");
    }
  };

  const deletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/packages/${id}`);
      setPackages(packages.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Admin Dashboard
      </h2>

      {/* TABS */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "bookings"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab("packages")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "packages"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          Packages
        </button>
      </div>

      {/* BOOKINGS TAB */}
      {activeTab === "bookings" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-pink-700 mb-2">{b.name}</h3>
                <p><b>Service:</b> {b.service}</p>
                <p><b>Email:</b> {b.email}</p>
                <p><b>Phone:</b> {b.phone}</p>
                <p><b>Date:</b> {b.date}</p>
                <p className="font-bold mt-2">₹{b.price}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => openEditBooking(b)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBooking(b._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EDIT BOOKING MODAL */}
          {editingBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">Edit Booking</h3>
                {["name","email","phone","service","date","price"].map(field => (
                  <input
                    key={field}
                    className="w-full border p-2 mb-2 rounded"
                    placeholder={field.toUpperCase()}
                    value={bookingFormData[field]}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, [field]: e.target.value })}
                  />
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={updateBooking}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingBooking(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* PACKAGES TAB */}
      {activeTab === "packages" && (
        <>
          <div className="mb-4">
            <button
              onClick={openAddPackage}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              + Add New Package
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                {pkg.image && (
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-pink-700 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-2">{pkg.description}</p>
                <p><b>Category:</b> {pkg.category}</p>
                <p><b>Duration:</b> {pkg.duration}</p>
                <p className="font-bold mt-2 text-lg">₹{pkg.price}</p>
                {pkg.features && pkg.features.length > 0 && (
                  <div className="mt-2">
                    <b>Features:</b>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {pkg.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => openEditPackage(pkg)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePackage(pkg._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PACKAGE MODAL */}
          {showPackageModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">
                  {editingPackage ? "Edit Package" : "Add New Package"}
                </h3>

                <input
                  type="text"
                  placeholder="Package Name"
                  value={packageFormData.name}
                  onChange={(e) => setPackageFormData({ ...packageFormData, name: e.target.value })}
                  className="w-full border p-2 mb-2 rounded"
                />
                <textarea
                  placeholder="Description"
                  value={packageFormData.description}
                  onChange={(e) => setPackageFormData({ ...packageFormData, description: e.target.value })}
                  className="w-full border p-2 mb-2 rounded"
                  rows="3"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={packageFormData.price}
                  onChange={(e) => setPackageFormData({ ...packageFormData, price: e.target.value })}
                  className="w-full border p-2 mb-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 4 hours, Full Day)"
                  value={packageFormData.duration}
                  onChange={(e) => setPackageFormData({ ...packageFormData, duration: e.target.value })}
                  className="w-full border p-2 mb-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Features (comma separated)"
                  value={packageFormData.features}
                  onChange={(e) => setPackageFormData({ ...packageFormData, features: e.target.value })}
                  className="w-full border p-2 mb-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={packageFormData.image}
                  onChange={(e) => setPackageFormData({ ...packageFormData, image: e.target.value })}
                  className="w-full border p-2 mb-2 rounded"
                />
                <select
                  value={packageFormData.category}
                  onChange={(e) => setPackageFormData({ ...packageFormData, category: e.target.value })}
                  className="w-full border p-2 mb-4 rounded"
                >
                  <option value="wedding">Wedding</option>
                  <option value="pre-wedding">Pre-Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="events">Events</option>
                  <option value="passport">Passport</option>
                  <option value="other">Other</option>
                </select>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={savePackage}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    {editingPackage ? "Update" : "Create"}
                  </button>
                  <button
                    onClick={() => setShowPackageModal(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
