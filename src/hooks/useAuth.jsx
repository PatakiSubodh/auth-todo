import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial session
        supabase.auth.getSession().then(({ data }) => {
        setUser(data?.session?.user ?? null);
        setLoading(false);
        });

        // Listen to auth changes
        const { data: { subscription } } =
        supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return { user, loading, logout };
}
