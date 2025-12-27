import React, { useEffect, useState } from "react";

function DogFetch() {
  const [currDog, SetCurrDog] = useState({ message: "" });
  const [isLoading, setIsLoading] = useState(false);
  

  const fetchDog = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!res.ok) throw new Error(`HTTPS error:${res.status}`);
        const result = await res.json();
        SetCurrDog(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    // Centered wrapper for the whole page
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">DogFetch API</h1>
      
      {/* Card Container */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-md border border-gray-200">
        
        {/* Image Box - Fixed height to prevent layout shift */}
        <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center mb-6 shadow-inner">
          {isLoading ? (
            <div className="flex flex-col items-center">
              {/* Simple CSS Spinner */}
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-gray-500 font-medium">Fetching pup...</p>
            </div>
          ) : (
            <img 
              src={currDog.message} 
              alt="Random Dog" 
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          )}
        </div>

        {/* Refined Button */}
        <button 
          onClick={fetchDog}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md"
        >
          Generate New Dog 🐾
        </button>
      </div>
    </div>
  );
}

export default DogFetch;