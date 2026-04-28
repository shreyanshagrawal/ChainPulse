import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Leaf, Link2, Shield } from "lucide-react";
import { PrimaryButton } from "./shared";

export default function Auth({ mode = "signin" }) {
  const navigate = useNavigate();
  const isSignin = mode === "signin";

  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");
      return;
    }
    if (!isSignin && !form.name.trim()) {
      setError("Please add your full name.");
      return;
    }
    // In a real app: call backend auth API here
    // For the hackathon: store a mock session and redirect
    localStorage.setItem("chainpulse_user", JSON.stringify({
      name: form.name || "Operator",
      email: form.email,
      company: form.company || "ChainPulse Inc.",
    }));
    // Sign in → dashboard directly. Sign up → onboarding flow.
    navigate(isSignin ? "/dashboard" : "/onboarding");
  };

  return (
    <div className="grid min-h-screen md:grid-cols-[0.52fr_0.48fr]">
      {/* Left panel */}
      <section className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#6d4bf4_0%,#8858ff_45%,#6d4bf4_100%)] p-10 text-white md:block">
        <Link to="/" className="flex items-center gap-3 text-2xl font-medium">
          <span className="h-4 w-4 rounded-full bg-white" />
          ChainPulse
        </Link>
        <div className="mt-40 max-w-xl">
          <h1 className="text-6xl font-semibold leading-tight tracking-tight">Your supply chain. Fully visible. Always.</h1>
          <p className="mt-6 text-2xl leading-9 text-white/80">Predict disruptions before they happen. Monitor every node in real time.</p>
          <div className="mt-12 space-y-5 text-lg text-white/85">
            {[[<Link2 className="h-5 w-5" />, "End-to-end supply chain visibility"], [<Shield className="h-5 w-5" />, "AI-powered disruption prediction"], [<Leaf className="h-5 w-5" />, "Operational and environmental health scores"]].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-4"><span className="text-white">{icon}</span><span>{text}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Right panel */}
      <section className="flex items-center justify-center bg-white px-6 py-12 text-slate-900">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-12 block text-sm text-slate-500 md:hidden">← Back to home</Link>
          <div className="text-xs uppercase tracking-[0.35em] text-slate-400">{isSignin ? "Welcome Back" : "Get Started"}</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight">{isSignin ? "Sign in to ChainPulse" : "Create your account"}</h2>

          {error && <div className="mt-6 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">{error}</div>}

          <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
            {!isSignin && (
              <>
                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-700">Full name</label>
                  <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your full name" className="h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-700">Company</label>
                  <input value={form.company} onChange={e => update("company", e.target.value)} placeholder="Company name" className="h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
              </>
            )}

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">Work email</label>
              <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@company.com" className="h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Password</label>
                {isSignin && <button type="button" className="text-sm text-violet-600">Forgot password?</button>}
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => update("password", e.target.value)} placeholder="Enter your password" className="h-14 w-full rounded-2xl border border-slate-200 px-4 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500" />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <PrimaryButton type="submit" className="h-14 w-full justify-center text-lg">
              {isSignin ? "Sign in" : "Create account"} <ArrowRight className="h-5 w-5" />
            </PrimaryButton>

            <div className="relative py-2 text-center text-sm text-slate-400">
              <span className="relative z-10 bg-white px-4">or</span>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200" />
            </div>

            <button type="button" onClick={() => { localStorage.setItem("chainpulse_user", JSON.stringify({ name: "Demo User", email: "demo@chainpulse.app", company: "ChainPulse" })); navigate(isSignin ? "/dashboard" : "/onboarding"); }} className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 text-lg font-medium hover:bg-slate-50 transition">
              <span className="font-bold text-blue-500 text-xl">G</span> Continue with Google
            </button>
          </form>

          <div className="mt-8 text-center text-base text-slate-500">
            {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link to={isSignin ? "/signup" : "/signin"} className="font-medium text-violet-600">
              {isSignin ? "Create one free" : "Sign in"} <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
