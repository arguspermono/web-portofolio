import { AtsResume } from '../components/sections/AtsResume';
import { ModulePanelHeader } from '../components/ui/ModulePanelHeader';
import { Button } from '../components/ui/Button';
import { FaPrint } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useRef, useState } from 'react';

export function Resume() {
  const { tokens } = useTheme();
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;

    const updateScale = () => {
      const pageWidth = (210 / 25.4) * 96;
      setPreviewScale(Math.min(1, container.clientWidth / pageWidth));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="blueprint-surface text-mecha-black min-h-screen print:min-h-0 flex flex-col">
      {/* ── 1. MODULE PANEL HEADER ───────────────────────────── */}
      <div className="print:hidden">
        <ModulePanelHeader
          moduleNumber="MODULE.004 //"
          title="RESUME"
          description="OFFICIAL CURRICULUM VITAE PREPARED FOR ATS (APPLICANT TRACKING SYSTEMS), INDUSTRY AUDIT, AND FORMAL PRINT DOCUMENTATION."
          theme="light"
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
        <div
          className="border-b px-6 md:px-10 py-3.5 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-neutral-600 uppercase transition-colors"
          style={{
            backgroundColor: tokens.contentSubtleBg,
            borderBottomColor: tokens.contentBorder,
          }}
        >
          <span>DOCUMENT SPEC // A4 PORTRAIT FORMAT</span>
          <span>ATS COMPLIANCE // 100%</span>
        </div>
      </div>

      {/* ── 2. RESUME PREVIEW CANVAS ─────────────────────────── */}
      <div className="print:hidden flex flex-grow justify-center overflow-hidden bg-neutral-100 p-4 sm:p-8 md:p-12">
        <div ref={previewContainerRef} className="w-full">
          <div
            className="mx-auto"
            style={{
              width: `${210 * previewScale}mm`,
              height: `${297 * previewScale}mm`,
            }}
          >
            <AtsResume previewScale={previewScale} />
          </div>
        </div>
      </div>

      {/* ── 3. PRINT ONLY VIEW ───────────────────────────────── */}
      <div className="hidden print:block w-full print:w-[210mm] bg-white print:bg-white text-black">
        <AtsResume />
      </div>
    </div>
  );
}
