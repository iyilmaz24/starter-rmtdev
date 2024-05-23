import toast from "react-hot-toast";

export function handleError(err: unknown, message = "An error occurred") {
  if (err instanceof Error) {
    toast.error(`${message} (${err.message})`);
  } else if (typeof err === "string") {
    toast.error(`${message} (${err})`);
  } else {
    toast.error(`${message}`);
  }
}
