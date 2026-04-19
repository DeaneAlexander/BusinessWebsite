import { GoogleTagManager } from "@next/third-parties/google";

type GtmProps = {
  containerId?: string;
};

export function Gtm({ containerId }: GtmProps) {
  if (!containerId) {
    return null;
  }

  return <GoogleTagManager gtmId={containerId} />;
}
