import { supabase } from "@/lib/supabase";
import { showToast } from "@/lib/toast";

export const authService = {
    login: {
        email: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            showToast.error(error.message);
            return { error };
        }

        if (!data.user.email_confirmed_at) {
            showToast.warning("Please verify your email first");
            await supabase.auth.signOut();
            return { error: "EMAIL_NOT_VERIFIED" };
        }

        showToast.success("Logged in successfully!");
        return { data };
        },

        google: async () => {
        showToast.info("Redirecting to Google...");

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            showToast.error(error.message);
            return { error };
        }
        },
    },

    signup: {
        email: async ({ email, password }) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            showToast.error(error.message);
            return { error };
        }

        // showToast.success(
        //     "Please check your email to confirm your account",
        //     { duration: 2000 }
        // );

        // showToast.info(
        //     "Redirecting to login page...",
        //     { duration: 5000 }
        // );

        showToast.success("Please check your email to confirm your account", {
            duration: 1500,  
        });
        setTimeout(() => {
            showToast.info("Redirecting to login page...", {
                duration: 2500,
            });
        }, 2000); 

        return { success: true };
        },
    },

    logout: async () => {
        await supabase.auth.signOut();
        showToast.success("Logged out");
    },
};
