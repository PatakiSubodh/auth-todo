import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const handle = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                const session = data?.session;
                if (session?.user) {
                    localStorage.setItem("user", JSON.stringify(session.user));
                    navigate("/todos", { replace: true });
                } else {
                    navigate("/login", { replace: true });
                }
            } catch (err) {
                console.error("Auth callback error:", err);
                navigate("/login", { replace: true });
            }
        };

        handle();
    }, [navigate]);

    return null;
}
