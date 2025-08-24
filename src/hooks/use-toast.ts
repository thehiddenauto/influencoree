export function useToast() {
  return {
    toast: (msg: { title: string; description?: string }) =>
      console.log("Toast:", msg.title, msg.description),
  };
}
