import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const onRegister = () => {
    // Handle registration logic here
  };

  const onGoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-10">
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
          Create account
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Start capturing your thoughts
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
              Full name
            </label>
            <input
              className="w-full bg-input-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
            />
          </div>
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
                placeholder="Min. 8 characters"
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
          onClick={onRegister}
          className="mt-6 w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-amber-400 transition-colors text-sm"
        >
          Create account
        </button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={onGoLogin}
            className="text-primary cursor-pointer hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
