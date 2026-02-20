'use client';

import { useEffect } from 'react';

// This script runs BEFORE React hydration to remove extension attributes
const extensionGuardScript = `
(function() {
  const extensionPrefixes = ['bis_', '__processed_', 'data-bis', 'eppiocemhmnlbh'];
  
  function removeAttrs(el) {
    if (!el || !el.attributes) return;
    Array.from(el.attributes).forEach(attr => {
      extensionPrefixes.forEach(prefix => {
        if (attr.name.includes(prefix)) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }
  
  // Remove from html and body immediately
  removeAttrs(document.documentElement);
  removeAttrs(document.body);
  
  // Remove from all existing elements
  document.querySelectorAll('*').forEach(removeAttrs);
})();
`;

export function ExtensionGuard() {
  useEffect(() => {
    // Client-side cleanup (backup)
    const removeExtensionAttributes = () => {
      const extensionPrefixes = ['bis_', '__processed_', 'data-bis', 'eppiocemhmnlbh'];
      
      const removeAttrs = (el) => {
        if (!el?.attributes) return;
        Array.from(el.attributes).forEach(attr => {
          extensionPrefixes.forEach(prefix => {
            if (attr.name.includes(prefix)) {
              el.removeAttribute(attr.name);
            }
          });
        });
      };

      removeAttrs(document.documentElement);
      removeAttrs(document.body);
      document.querySelectorAll('*').forEach(removeAttrs);
    };

    removeExtensionAttributes();
    
    const timeoutId = setTimeout(removeExtensionAttributes, 0);
    const intervalId = setInterval(removeExtensionAttributes, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  // Inject script that runs before hydration
  return (
    <script
      dangerouslySetInnerHTML={{ __html: extensionGuardScript }}
    />
  );
}
