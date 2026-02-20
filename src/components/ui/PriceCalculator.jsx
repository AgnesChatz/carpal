'use client';

import { useState } from 'react';
import { Card } from './Card';

export function PriceCalculator({ listingPrice, distance = 10 }) {
  const [seats, setSeats] = useState(1);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  
  // Calculate costs
  const carpalCost = listingPrice * seats * daysPerWeek * 4; // Monthly
  const taxiCost = distance * 1.5 * seats * daysPerWeek * 4; // ~€1.5/km for taxi
  const busCost = 1.2 * seats * daysPerWeek * 4; // ~€1.2 per ride bus
  const fuelCost = (distance * 0.15) * daysPerWeek * 4; // ~€0.15/km fuel
  
  const savingsVsTaxi = taxiCost - carpalCost;
  const savingsVsFuel = fuelCost - (carpalCost * 0.5); // Driver pays half

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Υπολογισμός εξοικονόμησης
        </h3>
        <p className="text-sm text-gray-600 mb-4">Δείτε πόσα χρήματα εξοικονομείτε</p>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Θέσεις</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSeats(Math.max(1, seats - 1))}
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="flex-1 text-center font-semibold">{seats}</span>
              <button
                onClick={() => setSeats(Math.min(4, seats + 1))}
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Ημέρες/εβδομάδα</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDaysPerWeek(Math.max(1, daysPerWeek - 1))}
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="flex-1 text-center font-semibold">{daysPerWeek}</span>
              <button
                onClick={() => setDaysPerWeek(Math.min(7, daysPerWeek + 1))}
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="space-y-3 mb-6">
          {/* Carpal */}
          <div className="flex items-center justify-between p-3 bg-green-600 text-white rounded-xl">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">carpal.gr</span>
            </div>
            <span className="text-xl font-bold">€{carpalCost.toFixed(0)}/μήνα</span>
          </div>

          {/* Taxi */}
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Ταξί</span>
            </div>
            <div className="text-right">
              <span className="text-gray-900 font-semibold">€{taxiCost.toFixed(0)}</span>
              <span className="text-xs text-red-500 ml-2">+{Math.round((taxiCost/carpalCost - 1) * 100)}%</span>
            </div>
          </div>

          {/* Own Car */}
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Δικό σας αμάξι</span>
            </div>
            <div className="text-right">
              <span className="text-gray-900 font-semibold">€{fuelCost.toFixed(0)}</span>
              <span className="text-xs text-gray-500 ml-2">μόνο καύσιμα</span>
            </div>
          </div>

          {/* Bus */}
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Λεωφορείο</span>
            </div>
            <span className="text-gray-900 font-semibold">€{busCost.toFixed(0)}</span>
          </div>
        </div>

        {/* Savings Highlight */}
        <div className="p-4 bg-white rounded-xl border-2 border-green-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Εξοικονομείτε σε σχέση με ταξί</p>
            <p className="text-3xl font-bold text-green-600">€{savingsVsTaxi.toFixed(0)}/μήνα</p>
            <p className="text-sm text-gray-500 mt-1">ή €{(savingsVsTaxi * 12).toFixed(0)}/χρόνο! 🎉</p>
          </div>
        </div>

        {/* Extra Benefits */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 bg-white rounded-lg">
            <p className="font-semibold text-gray-900">-30%</p>
            <p className="text-gray-500">CO₂</p>
          </div>
          <div className="p-2 bg-white rounded-lg">
            <p className="font-semibold text-gray-900">0</p>
            <p className="text-gray-500">Άγχος πάρκινγκ</p>
          </div>
          <div className="p-2 bg-white rounded-lg">
            <p className="font-semibold text-gray-900">+</p>
            <p className="text-gray-500">Νέες γνωριμίες</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function SavingsBadge({ listingPrice, distance = 10 }) {
  const taxiCost = distance * 1.5; // Per ride
  const savings = taxiCost - listingPrice;
  const savingsPercent = Math.round((savings / taxiCost) * 100);

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
      -{savingsPercent}% vs ταξί
    </span>
  );
}

export default PriceCalculator;
