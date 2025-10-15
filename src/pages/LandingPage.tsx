import Hero3DInteractive from '../components/sections/Hero3DInteractive';
import ExtremeSportsSection from '../components/sections/ExtremeSportsSection';
import AthletesSection from '../components/sections/AthletesSection';
import StatsSection from '../components/sections/StatsSection';
import TimelineSection from '../components/sections/TimelineSection';
import EventsSection from '../components/sections/EventsSection';
import Gallery360Section from '../components/sections/Gallery360Section';
import MapSection from '../components/sections/MapSection';
import Footer from '../components/sections/Footer';
import CustomCursor from '../components/ui/CustomCursor';

const LandingPage = () => {
  return (
    <div className="w-full bg-neutral">
      <CustomCursor />
      <Hero3DInteractive />
      <StatsSection />
      <ExtremeSportsSection />
      <AthletesSection />
      <TimelineSection />
      <EventsSection />
      <Gallery360Section />
      <MapSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
