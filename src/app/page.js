import SkysensePage from "@/components/SkysensePage";
import TimerSection from "@/components/detailedSections/TimerSection";

const LAUNCH_DATE = "2026-07-16T18:00:00";

export default function Home() {
  const isLaunched = Date.now() > new Date(LAUNCH_DATE).getTime();

  return <SkysensePage />;
}
