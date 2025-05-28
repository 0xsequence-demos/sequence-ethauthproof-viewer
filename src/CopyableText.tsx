import { CopyIcon } from "@0xsequence/design-system";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export default function CopyableText({ value }: { value: string }) {
  return (
    <CopyToClipboardButton value={value} asChild>
      <button className="m-auto px-3 gap-2 rounded-[7px] bg-black/20 flex items-center justify-center wrap-anywhere">
        {value}
        <CopyIcon name="copy" className="size-4" />
      </button>
    </CopyToClipboardButton>
  );
}
