import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "../../Loading/Loading";

const SingleProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const token = Cookies.get("core"); // তোমার কুকি থেকে token নাও
        if (!token) {
          setError("Authentication token not found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://mtsbackend20-production.up.railway.app/api/profile/singleprofile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.statusText}`);
        }

        const json = await response.json();

        // API তে data আসছে json.data
        setProfileData(json.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <Loading></Loading>;
  if (error) return <p className="p-6 max-w-6xl mx-auto text-red-600">Error: {error}</p>;
  if (!profileData) return <p className="p-6 max-w-6xl mx-auto">No profile data found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 text-accent font-primary">
        👤 Profile Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Profile Name</h3>
          <p className="text-xl text-accent font-secondary font-medium">{profileData.profileName}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Category</h3>
          <p className="text-xl text-accent font-secondary font-medium">{profileData.category}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Total Earnings</h3>
          <p className="text-2xl font-medium text-accent font-secondary">${profileData.totalEarnings}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Promotion Amount Today</h3>
          <p className="text-xl font-medium text-accent font-secondary">{profileData.promotionAmountToday}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">This Month's Special Orders</h3>
          <p className="text-xl font-medium text-accent font-secondary">{profileData.thisMonthSpecialOrdersCount}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">This Month's Earnings</h3>
          <p className="text-xl font-medium text-accent font-secondary">${profileData.thisMonthEarnings}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Rank Keywords Today</h3>
          <p className="text-xl font-medium text-accent font-secondary">{profileData.rankKeywordsToday}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Total Projects Count</h3>
          <p className="text-xl font-medium text-accent font-secondary">{profileData.totalProjectsCount}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Average Rating</h3>
          <p className="text-xl font-medium text-yellow-500 font-secondary">
            {profileData.averageRating === "N/A" ? "N/A" : `${profileData.averageRating} ⭐`}
          </p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Current Ranking</h3>
          <p className="text-xl font-medium text-red-500 font-secondary">{profileData.currentRanking}</p>
        </div>

        <div className="bg-card shadow-lg border-primary border rounded-2xl p-5">
          <h3 className="text-lg font-primary text-accent font-medium">Total Cancelled Count</h3>
          <p className="text-xl font-medium text-accent font-secondary">{profileData.totalCancelledCount}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProfilePage;
