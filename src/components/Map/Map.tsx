import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi2';

export function Map() {
  return (
    <div className="h-[calc(100vh-64px)] bg-gray-200 relative">
      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
        Map Placeholder
      </div>

      <div className="absolute top-4 left-4">
        <div className="bg-white rounded-lg shadow-md flex flex-col divide-y">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-t-lg">
            <HiOutlinePlus className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-b-lg">
            <HiOutlineMinus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
