import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    description: "",
    category: "other"
  });

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsAdmin(adminLoggedIn);
    
    // Fetch photos
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery");
      setPhotos(res.data);
    } catch (err) {
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingPhoto(null);
    setFormData({
      title: "",
      imageUrl: "",
      description: "",
      category: "other"
    });
    setShowModal(true);
  };

  const openEditModal = (photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title || "",
      imageUrl: photo.imageUrl || "",
      description: photo.description || "",
      category: photo.category || "other"
    });
    setShowModal(true);
  };

  const savePhoto = async () => {
    try {
      if (editingPhoto) {
        await axios.put(`http://localhost:5000/api/gallery/${editingPhoto._id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/gallery", formData);
      }
      setShowModal(false);
      fetchPhotos();
    } catch (err) {
      console.error("Error saving photo:", err);
      alert("Failed to save photo. Please try again.");
    }
  };

  const deletePhoto = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error("Error deleting photo:", err);
      alert("Failed to delete photo. Please try again.");
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsAdmin(false);
  };

  return (
    <div className="bg-pink-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-pink-700">
            Photo Gallery
          </h2>
          {isAdmin && (
            <div className="flex gap-3">
              <button
                onClick={openAddModal}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                + Add Photo
              </button>
              <button
                onClick={logoutAdmin}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Logout Admin
              </button>
            </div>
          )}
        </div>

        {/* PHOTOS GRID */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading photos...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No photos in gallery yet.</p>
            {isAdmin && (
              <button
                onClick={openAddModal}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
              >
                Add First Photo
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative group"
              >
                <div className="relative">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-64 object-cover"
                  />
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(photo)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deletePhoto(photo._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {photo.description}
                    </p>
                  )}
                  {photo.category && (
                    <span className="inline-block bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">
                      {photo.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ADD/EDIT MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">
                  {editingPhoto ? "Edit Photo" : "Add New Photo"}
                </h3>

                <input
                  type="text"
                  placeholder="Photo Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />

                <input
                  type="url"
                  placeholder="Image URL *"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />

                {formData.imageUrl && (
                  <div className="mb-4">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <textarea
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  rows="3"
                />

                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option value="wedding">Wedding</option>
                  <option value="pre-wedding">Pre-Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="events">Events</option>
                  <option value="passport">Passport</option>
                  <option value="other">Other</option>
                </select>

                <div className="flex justify-between gap-3">
                  <button
                    onClick={savePhoto}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    {editingPhoto ? "Update" : "Add Photo"}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
