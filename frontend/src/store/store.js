import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEmailGeneratorStore = create(
  persist(
    (set) => ({

      // initial states
      userDetails: null,
      accessToken: null,
      usageDetails: null,
      generatedEmail: null,

      // setter functions below -
      setUsageDetails: (updater) => set((state) => ({
        usageDetails: typeof updater === 'function'
          ? updater(state.usageDetails)
          : updater,
      })
      ),
      setUserDetails: (details) => set({ userDetails: details }),
      setAccessToken: (token) => set({ accessToken: token }),
      setGeneratedEmail: (mail) => set({ generatedEmail: mail }),
      resetStore: () => set({
        userDetails: null,
        accessToken: null,
        usageDetails: null,
        generatedEmail: null,
      }),
    }),

    {
      name: 'email-generator-store', // localStorage key
      partialize: (state) => ({
        userDetails: state?.userDetails,
        accessToken: state?.accessToken,
        usageDetails: state?.usageDetails,
        generatedEmail: state?.generatedEmail,
      })
    }
  )
);