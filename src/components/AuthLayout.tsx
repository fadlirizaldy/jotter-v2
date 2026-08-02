import { Navigate } from "react-router-dom";

import { useTheme } from "../context/theme-context";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  //   const { theme, handleToggleTheme } = useTheme();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    // <BackgroundGradient className="min-h-screen flex justify-center items-center p-5 md:p-0">
    //   <div className="bg-stone-50 rounded-md w-[720px] min-h-[400px] shadow-lg grid grid-cols-1 sm:grid-cols-2 dark:bg-dark-bg-primary">
    //     <div className="h-full bg-emerald-100 rounded-s-md flex-col items-center justify-center flex p-4">
    //       <img src="/logo.png" className="w-16 h-16 mb-4" />
    //       <h4 className="font-bold text-xl">Your virtual reminder space</h4>
    //       <p className="text-neutral-600 text-sm text-center">
    //         Empower your productivity with Jotter - where notes evolve and
    //         solutions emerge!
    //       </p>
    //     </div>
    //     {children}

    //     <div className="absolute top-7 right-7">
    //       {theme === "light" ? (
    //         <Icon
    //           icon="ph:moon-fill"
    //           className={"cursor-pointer"}
    //           width={24}
    //           onClick={handleToggleTheme}
    //         />
    //       ) : (
    //         <Icon
    //           icon="ph:sun-fill"
    //           className={"cursor-pointer "}
    //           width={24}
    //           onClick={handleToggleTheme}
    //         />
    //       )}
    //     </div>
    //   </div>
    // </BackgroundGradient>
    <>
      <div>
        <h2>Welcome to the Auth Layout</h2>
      </div>
    </>
  );
};
