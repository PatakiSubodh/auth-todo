import { supabase } from "@/lib/supabase";
import { showToast } from "@/lib/toast";

export const signInWithGoogle = async () => {
    showToast.info("Redirecting to Google...");

    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
        redirectTo: `${window.location.origin}/auth/callback`, // a new callback route
        },
    });

    if (error) console.error("Google auth error:", error.message);
};
