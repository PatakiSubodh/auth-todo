import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { showToast } from "@/lib/toast";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`, // dynamic redirect
            });

            if (error) throw error;

            setSuccess(true);
            showToast.success("Password reset link sent to your email");
        } catch (err) {
            const message = err?.message || "An error occurred";
            setError(message);
            showToast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        {success ? (
            <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
                <CardDescription className="text-center">
                Password reset instructions sent
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                If you registered using your email and password, you will receive a password reset
                email shortly.
                </p>
            </CardContent>
            </Card>
        ) : (
            <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
                <CardDescription>
                Type in your email and we&apos;ll send you a link to reset your password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </Button>
                <div className="mt-4 text-center text-sm">
                    Remembered your password?{" "}
                    <a href="/login" className="underline underline-offset-4">
                    Login
                    </a>
                </div>
                </form>
            </CardContent>
            </Card>
        )}
        </div>
    );
};

export default ForgotPasswordPage;
