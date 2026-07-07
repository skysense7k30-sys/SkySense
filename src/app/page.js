import SkysensePage from "@/components/SkysensePage";
import TimerSection from "@/components/detailedSections/TimerSection";

const LAUNCH_DATE = "2026-09-01T09:00:00";

export default function Home() {
  const isLaunched = Date.now() > new Date(LAUNCH_DATE).getTime();

  return isLaunched ? <SkysensePage /> : <TimerSection id="timer" targetDate={LAUNCH_DATE} />;
}