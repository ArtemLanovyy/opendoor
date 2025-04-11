export function OfferBanner() {
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden border border-gray-200 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-4 bg-blue-50/50">
      <div className="relative w-full h-[240px] lg:w-[240px] lg:h-[180px]">
        <div className="w-full h-full bg-blue-100"></div>
        <div className="absolute top-2 left-2">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <img src="/opendoor-logo.png" alt="" className="h-3.5" />
            Opendoor
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 p-4 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Make your strongest offer when you buy with Opendoor
        </h3>
      </div>
    </div>
  );
}
