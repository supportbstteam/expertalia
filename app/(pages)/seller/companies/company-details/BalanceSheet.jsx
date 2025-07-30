'use client';

import React, { useState, useEffect } from 'react';

const initialFormData = {
  currentAssets: { 2022: '', 2023: '', 2024: '' },
  treasury: { 2022: '', 2023: '', 2024: '' },
  nonCurrentAsset: { 2022: '', 2023: '', 2024: '' },
  currentLiabilities: { 2022: '', 2023: '', 2024: '' },
  shortTermDebts: { 2022: '', 2023: '', 2024: '' },
  nonCurrentLiabilities: { 2022: '', 2023: '', 2024: '' },
  longTermDebts: { 2022: '', 2023: '', 2024: '' },
  netWorth: { 2022: '', 2023: '', 2024: '' },
};

export default function BalanceSheet({ apiData }) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (apiData) {
      setFormData(apiData); // Assume apiData matches the shape
    }
  }, [apiData]);

  const handleChange = (field, year, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [year]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log('Saving data:', formData);
    // You can send it to API here
  };

  const fields = [
    { key: 'currentAssets', label: 'Current assets' },
    { key: 'treasury', label: 'Treasury' },
    { key: 'nonCurrentAsset', label: 'Non-current asset' },
    { key: 'currentLiabilities', label: 'Current liabilities' },
    { key: 'shortTermDebts', label: 'Short-term debts (optional)' },
    { key: 'nonCurrentLiabilities', label: 'Non-current liabilities (optional)' },
    { key: 'longTermDebts', label: 'Long-term debts (optional)' },
    { key: 'netWorth', label: 'Net worth' },
  ];

  const years = ['2022', '2023', '2024'];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Balance</h2>
      <p className="text-sm text-gray-600 mb-4">
        This panel is autocomplete with data extracted from the Commercial Registry.
      </p>
      <div className="bg-indigo-50 text-sm p-3 rounded-md border border-indigo-200 mb-6">
        <span className="font-medium text-indigo-600">In your case,</span> we have not found this
        information and you will need to complete the panel manually.
      </div>

      <table className="w-full text-sm mb-4">
        <thead>
          <tr className="text-left font-semibold">
            <th className="p-2">Balance (€)</th>
            {years.map((year) => (
              <th key={year} className="p-2">{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map(({ key, label }) => (
            <tr key={key} className="border-t">
              <td className="p-2">{label}</td>
              {years.map((year) => (
                <td key={year} className="p-2">
                  <input
                    type="text"
                    value={formData[key]?.[year] || ''}
                    onChange={(e) => handleChange(key, year, e.target.value)}
                    className="border px-2 py-1 w-full rounded text-right"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSave}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Save
      </button>
    </div>
  );
}
