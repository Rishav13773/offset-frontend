import React, { useState, useEffect } from "react";
import { Leaf, TrendingUp, Shield, Award } from "lucide-react";
import SearchFilter from "./SearchFilter";
import CreditCard from "./CreditCard";

import { generateRetirementCertificate } from "../utils/certificateGenerator";
import carbonCreditsData from "../data/credits.json";

const Dashboard = () => {
  const [credits, setCredits] = useState(carbonCreditsData);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredCredits, setFilteredCredits] = useState([]);

  useEffect(() => {
    // setCredits(carbonCreditsData);
    handleFilterChange();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [searchTerm]);

  const handleFilterChange = () => {
    const filteredCredits = credits.filter((credit) => {
      const matchesSearch =
        credit.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        credit.vintage === Number(searchTerm);

      return matchesSearch;
    });
    setFilteredCredits(filteredCredits);
  };

  const handleDownloadCertificate = (credit) => {
    generateRetirementCertificate(credit);
  };

  if (credits.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Leaf className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Loading credits...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="rounded-lg bg-green-100 p-2">
                <Leaf className="h-6 w-6 text-green-600" />
              </div> */}
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Carbon Credits Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Track and manage carbon offset credits
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {filteredCredits.length === 0 ? (
          <div className="py-12 text-center">
            <Leaf className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No credits found
            </h3>
            <p className="mt-1 text-sm text-gray-500">Try again.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCredits.map((credit) => (
              <CreditCard
                key={credit.unic_id}
                credit={credit}
                onDownloadCertificate={handleDownloadCertificate}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
