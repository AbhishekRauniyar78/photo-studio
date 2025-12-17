import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages");
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Group packages by category
  const packagesByCategory = {
    wedding: packages.filter(p => p.category === "wedding"),
    "pre-wedding": packages.filter(p => p.category === "pre-wedding"),
    birthday: packages.filter(p => p.category === "birthday"),
    events: packages.filter(p => p.category === "events"),
    passport: packages.filter(p => p.category === "passport"),
    other: packages.filter(p => p.category === "other"),
  };

  const categoryTitles = {
    wedding: "Wedding Photography",
    "pre-wedding": "Pre-Wedding Shoots",
    birthday: "Birthday & Celebrations",
    events: "Events & Functions",
    passport: "Passport & Document Photos",
    other: "Other Services",
  };

  return (
    <div className="font-sans">
      {/* HERO SECTION */}
      <section
        className="h-[90vh] bg-cover bg-center text-white flex flex-col justify-center items-center text-center px-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.pexels.com/photos/3746149/pexels-photo-3746149.jpeg')",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          ANOOP Photo Studio
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Capture Your Special Moments With Professional Photography
        </p>
        <Link to="/booking">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 transition text-white rounded-md text-base">
            Book Now
          </button>
        </Link>
      </section>

      {/* SHOOTING PACKAGES SECTION */}
      <section className="py-16 px-5 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Our Shooting Packages
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Choose the perfect package for your special occasion
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading packages...</p>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No packages available at the moment.</p>
            </div>
          ) : (
            Object.entries(packagesByCategory).map(([category, categoryPackages]) => {
              if (categoryPackages.length === 0) return null;
              
              return (
                <div key={category} className="mb-16">
                  <h3 className="text-3xl font-semibold mb-8 text-center text-pink-700">
                    {categoryTitles[category] || category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryPackages.map((pkg) => (
                      <div
                        key={pkg._id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                      >
                        {pkg.image && (
                          <div className="h-64 overflow-hidden">
                            <img
                              src={pkg.image}
                              alt={pkg.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-2xl font-bold text-gray-800">
                              {pkg.name}
                            </h4>
                            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                              ₹{pkg.price}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 min-h-[3rem]">
                            {pkg.description}
                          </p>
                          {pkg.duration && (
                            <p className="text-sm text-gray-500 mb-3">
                              <span className="font-semibold">Duration:</span> {pkg.duration}
                            </p>
                          )}
                          {pkg.features && pkg.features.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-semibold text-gray-700 mb-2">
                                Features:
                              </p>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {pkg.features.slice(0, 3).map((feature, idx) => (
                                  <li key={idx}>{feature}</li>
                                ))}
                                {pkg.features.length > 3 && (
                                  <li className="text-pink-600">
                                    +{pkg.features.length - 3} more
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                          <Link to="/booking">
                            <button className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-pink-800 transition-all duration-300 shadow-md hover:shadow-lg">
                              Book This Package
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-12 px-5 text-center bg-white">
        <h2 className="text-3xl font-semibold mb-8">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Wedding Photography",
              desc: "Professional wedding photos & cinematic videos",
            },
            {
              title: "Pre-Wedding Shoot",
              desc: "Beautiful outdoor & indoor pre-wedding shoots",
            },
            {
              title: "Birthday & Events",
              desc: "Birthday parties, engagements & family events",
            },
            {
              title: "Passport Photos",
              desc: "Instant passport & document photos",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="border rounded-xl p-5 hover:shadow-lg transition border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gray-900 text-white py-12 text-center px-5">
        <h2 className="text-3xl font-semibold mb-4">
          Make Your Memories Last Forever
        </h2>
        <Link to="/gallery">
          <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
            View Gallery
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-5 text-center text-sm text-gray-700">
        <p>📍Ward no 10 Mahuhwa Maharajganj(273303), UP</p>
        <p>📞 +91 7518110952</p>
        <p>✉️ anoopkumar6644@gmail.com</p>
      </footer>
    </div>
  );
}
