import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { postLogin } from "../utils/api";
import InputText from "../components/InputText";
import {
  email_validation,
  password_validation,
} from "../utils/input-validation";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: LoginForm) => {
    setIsLoading(true);
    const payload = {
      email: e.email,
      password: e.password,
    };

    const response = await postLogin(payload);
    if (response.error) {
      setError("password", { type: "apiResponse", message: response.message });
      toast.error(response.message, { duration: 2500, position: "top-right" });
    } else {
      toast.success("Success login", { duration: 2500, position: "top-right" });
      localStorage.setItem("token", response.data.accessToken);
      navigate("/");
    }
    setIsLoading(false);
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            className="flex flex-col gap-2"
          >
            <InputText
              errors={errors.email}
              register={register}
              {...email_validation}
            />
            <InputText
              errors={errors.password}
              register={register}
              {...password_validation}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full bg-primary cursor-pointer text-primary-foreground font-semibold py-3 rounded-lg hover:bg-amber-400 transition-colors text-sm"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

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
