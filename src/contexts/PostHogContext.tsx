import React, { createContext, useContext, useEffect } from 'react';
import posthog from 'posthog-js';
import { STORE_ID } from '@/lib/config';

interface PostHogContextType {
  initialized: boolean;
}

const PostHogContext = createContext<PostHogContextType | undefined>(undefined);

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = React.useState(false);

  useEffect(() => {
    const POSTHOG_KEY = 'phc_ru49b7F3aVosgfA5g91sIGxRC2iBU0RMWFekcI5iSR7';
    
    if (typeof window !== 'undefined' && POSTHOG_KEY) {
      posthog.init(POSTHOG_KEY, {
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: false,
        loaded: (posthog) => {
          console.log('✅ PostHog loaded successfully via proxy!');
          console.log('🔍 API Host: /ingest');
        },
        debug: true,
      });
      
      // Asociar todos los eventos al grupo 'store' con Group Analytics
      posthog.group('store', STORE_ID);
      
      setInitialized(true);
      console.log('PostHog initialized with group analytics for store:', STORE_ID);
    }
  }, []);

  return (
    <PostHogContext.Provider value={{ initialized }}>
      {children}
    </PostHogContext.Provider>
  );
}

export function usePostHog() {
  const context = useContext(PostHogContext);
  if (context === undefined) {
    throw new Error('usePostHog must be used within a PostHogProvider');
  }
  return context;
}
