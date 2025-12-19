import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import pattern from "@/assets/pattern2.png"
import { Link } from "react-router-dom"
import { showToast } from "@/lib/toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// auth
import { authService } from "@/features/auth/services/authService";


export function SignupForm({ className, ...props }) {

    // Hooks
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Handlers 
    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showToast.warning("Passwords do not match");
            return;
        }

        setLoading(true);

        const res = await authService.signup.email({ email, password });

        if (res?.success) {
            setTimeout(() => navigate("/login"), 3000);
        }

        setLoading(false);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={handleSignup} className="p-6 md:p-8">
                <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to create your account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Field>
                <Field>
                    <Field className="grid grid-rows-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirm-password">
                        Confirm Password
                        </FieldLabel>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Field>
                    </Field>
                    {error && <p className="text-red-500">{error}</p>}
                    {/* <FieldDescription>
                    Must be at least 8 characters long, have a number and a special character.
                    </FieldDescription> */}
                </Field>
                <Field>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="transition-transform duration-150 active:scale-90"
                    >
                        {loading ? "Signing up..." : "Create Account"}
                    </Button>

                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                </FieldSeparator>
                <Field className="w-full">
                    <Button variant="outline" type="button" onClick={authService.login.google}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                        />
                    </svg>
                    <span className="sr-only">Sign up with Google</span>
                    </Button>
                </Field>
                <FieldDescription className="text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="underline underline-offset-4">
                        Sign in
                    </Link>
                </FieldDescription>
                </FieldGroup>
            </form>
            <div className="bg-muted relative hidden md:block">
                <img
                src={pattern}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
        </FieldDescription>
        </div>
    )
}