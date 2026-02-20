'use client';

const verificationLevels = {
  phone: {
    icon: PhoneIcon,
    label: 'Τηλέφωνο',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  email: {
    icon: EmailIcon,
    label: 'Email',
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  id: {
    icon: IDIcon,
    label: 'Ταυτότητα',
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  license: {
    icon: LicenseIcon,
    label: 'Δίπλωμα',
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  super: {
    icon: ShieldIcon,
    label: 'Super Verified',
    color: 'bg-gray-900 text-white border-gray-900'
  }
};

export function VerificationBadge({ type, size = 'md' }) {
  const config = verificationLevels[type];
  if (!config) return null;
  
  const Icon = config.icon;
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2'
  };
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${config.color} ${sizes[size]}`}>
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}

export function VerificationStack({ verifications = [], size = 'sm' }) {
  const verifiedTypes = Object.keys(verifications).filter(key => verifications[key]);
  
  if (verifiedTypes.length === 0) return null;
  
  // If all 4 basic verifications, show super verified
  const isSuperVerified = verifiedTypes.length >= 4;
  
  return (
    <div className="flex flex-wrap gap-1">
      {isSuperVerified ? (
        <VerificationBadge type="super" size={size} />
      ) : (
        verifiedTypes.map(type => (
          <VerificationBadge key={type} type={type} size={size} />
        ))
      )}
    </div>
  );
}

export function VerificationProgress({ verifications = {} }) {
  const total = 4;
  const completed = Object.values(verifications).filter(Boolean).length;
  const percentage = (completed / total) * 100;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Επαλήθευση προφίλ</span>
        <span className="font-medium text-gray-900">{completed}/{total}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gray-900 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {completed < total && (
        <p className="text-xs text-gray-500">
          Ολοκλήρωσε την επαλήθευση για περισσότερη εμπιστοσύνη
        </p>
      )}
    </div>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IDIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  );
}

function LicenseIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export default VerificationBadge;
