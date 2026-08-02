import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

import {
  email_validation,
  name_validation,
  password_validation,
} from "../utils/input-validation";
import InputText from "../components/InputText";
import { postRegister } from "../utils/api";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: RegisterForm) => {
    setIsLoading(true);
    const payload = {
      name: e.name,
      email: e.email,
      password: e.password,
    };

    const response = await postRegister(payload);
    if (response.error) {
      setError("password", { type: "apiResponse", message: response.message });
      toast.error(response.message, { duration: 2500, position: "top-right" });
    } else {
      toast.success("Success create user, please login to continue", {
        duration: 2500,
        position: "top-right",
      });
      navigate("/login");
    }
    setIsLoading(false);
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          className="flex flex-col gap-2"
        >
          <InputText
            errors={errors.name}
            register={register}
            {...name_validation}
          />
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
            className="mt-6 w-full cursor-pointer bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-amber-400 transition-colors text-sm"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

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
