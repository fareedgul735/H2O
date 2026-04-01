import { LoaderIcon } from "lucide-react";

export const ButtonLoader = ({ color = "white", size = 24 }) => (
  <LoaderIcon className={`animate-spin text-${color}`} size={size} />
);
