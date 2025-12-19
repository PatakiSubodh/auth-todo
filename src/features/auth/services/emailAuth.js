import { supabase } from "@/lib/supabase";

export const loginWithEmail = async (email, password) => {
    return await supabase.auth.signInWithPassword({
        email,
        password,
    });
};

export const signupWithEmail = async (email, password) => {
    return await supabase.auth.signUp({
        email,
        password,
    });
};
