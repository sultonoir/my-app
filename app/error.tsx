"use client";

import { useEffect } from "react";
import EmptyState from "../components/shared/EmptyState";

interface ErrorPageProps {
  error: Error;
}
const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Oh no!"
      subtitle="Something went wrong"
    />
  );
};
export default ErrorPage;
