import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { showToast } from "@/lib/toast";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
        showToast.error(error.message);
        } else {
        showToast.success("Password updated successfully");
        navigate("/login");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
            <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold text-center">
                Reset Password
            </h1>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                <Button className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
                </Button>
            </form>
            </CardContent>
        </Card>
        </div>
    );
};

export default ResetPasswordPage;
