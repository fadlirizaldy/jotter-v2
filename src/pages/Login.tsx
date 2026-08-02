import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const onLogin = () => {
    // Handle login logic here
  };

  const onGoRegister = () => {
    navigate("/sign-up");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-card border-r border-border p-12">
        <div className="flex items-center gap-2">
          <BookOpen size={22} className="text-primary" />
          <span
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-2xl text-foreground"
          >
            Jotter
          </span>
        </div>
        <div>
          <blockquote
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-3xl text-foreground leading-tight mb-6"
          >
            "A place for every thought, no matter how small."
          </blockquote>
          <p className="text-muted-foreground text-sm">
            Capture ideas before they escape.
          </p>
        </div>
        <div className="flex gap-3">
          {["#f0a500", "#e8e6df", "#6b6f7e"].map((c) => (
            <div
              key={c}
              style={{ background: c }}
              className="w-3 h-3 rounded-full opacity-80"
            />
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <BookOpen size={20} className="text-primary" />
            <span
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-xl text-foreground"
            >
              Jotter
            </span>
          </div>

          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-3xl text-foreground mb-1"
          >
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Sign in to your notes
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                className="w-full bg-input-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full bg-input-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors pr-10"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onLogin}
            className="mt-6 w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-amber-400 transition-colors text-sm"
          >
            Sign in
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account yet?{" "}
            <button
              onClick={onGoRegister}
              className="text-primary cursor-pointer hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
