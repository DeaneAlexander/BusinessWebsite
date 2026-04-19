import { GoogleAnalytics } from "@next/third-parties/google";

type Ga4Props = {
  measurementId?: string;
};

export function Ga4({ measurementId }: Ga4Props) {
  if (!measurementId) {
    return null;
  }

  return <GoogleAnalytics gaId={measurementId} />;
}
