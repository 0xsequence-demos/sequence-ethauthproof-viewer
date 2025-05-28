import { toast } from "sonner";
export function CopyToClipboardButton({
  children,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
  asChild?: boolean;
}) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      console.error(err);
      toast("Failed to copy");
    }
  };

  return <div onClick={() => copyToClipboard(value)}>{children}</div>;
}
