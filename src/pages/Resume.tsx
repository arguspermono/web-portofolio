import { AtsResume } from '../components/sections/AtsResume';
import { ModulePanelHeader } from '../components/ui/ModulePanelHeader';
import { Button } from '../components/ui/Button';
import { FaPrint, FaDownload } from 'react-icons/fa';

export function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-mecha-black text-mecha-white min-h-screen flex flex-col">
      {/* ── 1. MODULE PANEL HEADER ───────────────────────────── */}
      <div className="print:hidden">
        <ModulePanelHeader
          moduleNumber="MODULE.004 //"
          title="RESUME"
          description="OFFICIAL CURRICULUM VITAE PREPARED FOR ATS (APPLICANT TRACKING SYSTEMS), INDUSTRY AUDIT, AND FORMAL PRINT DOCUMENTATION."
          theme="dark"
          statusTag="STATUS // VERIFIED"
        >
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={handlePrint}
              className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase font-semibold"
            >
              <FaPrint className="text-xs" />
              <span>PRINT / SAVE PDF</span>
            </Button>
          </div>
        </ModulePanelHeader>

        {/* Action instruction strip */}
        <div className="border-b border-mecha-dark3 bg-mecha-dark1 px-6 md:px-10 py-3.5 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
          <span>DOCUMENT SPEC // A4 PORTRAIT FORMAT</span>
          <span>ATS COMPLIANCE // 100%</span>
        </div>
      </div>

      {/* ── 2. RESUME PREVIEW CANVAS ─────────────────────────── */}
      <div className="print:hidden p-4 sm:p-8 md:p-12 bg-mecha-dark2 flex justify-center flex-grow">
        <div className="w-full max-w-[215mm] bg-white text-black border border-mecha-dark3 p-4 sm:p-8 relative">
          {/* Subtle Corner Markers */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-neutral-400 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-neutral-400 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-2 border-b border-l border-neutral-400 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-2 border-b border-r border-neutral-400 pointer-events-none" />

          {/* Render ATS Resume */}
          <AtsResume />
        </div>
      </div>

      {/* ── 3. PRINT ONLY VIEW ───────────────────────────────── */}
      <div className="hidden print:block w-full bg-white print:bg-white text-black min-h-screen">
        <AtsResume />
      </div>
    </div>
  );
}
