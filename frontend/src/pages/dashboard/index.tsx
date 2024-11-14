import { postLogout } from "@/api/auth-api";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export function DashboardPage() {
  const dispatch = useDispatch();

  const { mutate: mutateLogout } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      dispatch(logout());
    },
  });

  const handleLogout = () => {
    mutateLogout();
  };
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}
