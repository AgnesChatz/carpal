'use client';

import { useState } from 'react';
import { Card, Button } from '@/components/ui';

export function GroupBooking({ 
  maxSeats, 
  pricePerSeat, 
  onBook,
  inviteLink = 'https://carpal.gr/join/abc123'
}) {
  const [seats, setSeats] = useState(1);
  const [invitedEmails, setInvitedEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [copied, setCopied] = useState(false);

  const totalPrice = pricePerSeat * seats;

  const handleAddEmail = () => {
    if (emailInput && !invitedEmails.includes(emailInput)) {
      setInvitedEmails([...invitedEmails, emailInput]);
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (email) => {
    setInvitedEmails(invitedEmails.filter(e => e !== email));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Ομαδική κράτηση
        </h3>

        {/* Seat Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Θέσεις ({seats} {seats === 1 ? 'άτομο' : 'άτομα'})
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSeats(Math.max(1, seats - 1))}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <span className="flex-1 text-center font-semibold text-lg">{seats}</span>
            <button
              onClick={() => setSeats(Math.min(maxSeats, seats + 1))}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Invite Friends */}
        {seats > 1 && (
          <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
            <p className="text-sm font-medium text-purple-900 mb-3">
              Κάλεσε φίλους να κλείσουν μαζί σου
            </p>

            {/* Email Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="email"
                placeholder="email@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAddEmail}
                disabled={!emailInput}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 disabled:opacity-50"
              >
                Πρόσκληση
              </button>
            </div>

            {/* Invited List */}
            {invitedEmails.length > 0 && (
              <div className="space-y-2 mb-3">
                {invitedEmails.map((email) => (
                  <div key={email} className="flex items-center justify-between bg-white p-2 rounded-lg">
                    <span className="text-sm text-gray-700">{email}</span>
                    <button
                      onClick={() => handleRemoveEmail(email)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Share Link */}
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-white rounded-lg text-sm text-gray-500 truncate">
                {inviteLink}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Αντιγράφηκε
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Αντιγραφή
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Price Summary */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Σύνολο για {seats} {seats === 1 ? 'θέση' : 'θέσεις'}</p>
            <p className="text-2xl font-bold text-gray-900">€{totalPrice.toFixed(2)}</p>
          </div>
          <Button onClick={() => onBook?.(seats, invitedEmails)}>
            Κράτηση ομάδας
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default GroupBooking;
