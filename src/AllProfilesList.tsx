// ... (আপনার অন্যান্য import এবং setup কোড)

const MarketPlaceProfile = () => {
    // ... (আপনার অন্যান্য state এবং hooks)
  
    const { data, loading, error, refetch } = useFetchData(
      "https://mtsbackend20-production.up.railway.app/api/profile"
    );
  
    // --- শুধু এই লাইনটিই আপনার দরকার ---
    const allProfileNames = data?.profiles?.map(profile => profile.profile_name) || [];
    // ------------------------------------
  
    // আপনি চাইলে এই `allProfileNames` অ্যারেটিকে console.log করে দেখতে পারেন:
    // console.log("আমার দরকারি প্রোফাইল নামগুলো:", allProfileNames);
  
    // ... (আপনার অন্যান্য কোড যেমন transformedProfiles, filteredProfiles, tableHeaders, return statement ইত্যাদি)
  
    // উদাহরণস্বরূপ, আপনি যদি শুধু এই নামগুলো কোথাও দেখাতে চান:
    return (
      <div>
        <h1 className="bg-red-900">প্রোফাইল নামগুলির তালিকা:</h1>
        {loading && <p>নামগুলো লোড হচ্ছে...</p>}
        {error && <p>এরর: {error.message}</p>}
        {allProfileNames.length > 0 ? (
          <ul>
            {allProfileNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>কোনো প্রোফাইল নাম পাওয়া যায়নি।</p>
        )}
        {/* আপনার MarketPlaceProfile এর বাকি UI এখানে থাকবে */}
      </div>
    );
  };
  
  // ... (আপনার export default MarketPlaceProfile কোড)