import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./router";
import { RootState } from "./store";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { logout, authenticate } from "./store/auth/authSlice";
import { postRefreshAccessToken } from "./api/auth-api";

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const { mutate: refreshToken } = useMutation({
    mutationFn: postRefreshAccessToken,
    onSuccess: (data) => {
      dispatch(authenticate(data));
    },
    onError: () => {
      dispatch(logout());
    },
  });

  useEffect(() => {
    if (!accessToken) {
      refreshToken();
    }
  }, [accessToken, refreshToken]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
