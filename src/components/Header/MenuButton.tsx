interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 text-[#2a2c30] hover:text-[#71767c] transition-colors cursor-pointer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <g style={{ transformOrigin: '12px 12px', transition: 'transform 0.3s ease' }}>
          <path
            d="M3 8L21 8"
            style={{
              transformOrigin: '12px 12px',
              transform: isOpen ? 'rotate(45deg) translate(0, 4px)' : 'none',
              transition: 'transform 0.3s ease',
            }}
          />
        </g>
        <g style={{ transformOrigin: '12px 12px', transition: 'transform 0.3s ease' }}>
          <path
            d="M3 16L21 16"
            style={{
              transformOrigin: '12px 12px',
              transform: isOpen ? 'rotate(-45deg) translate(0, -4px)' : 'none',
              transition: 'transform 0.3s ease',
            }}
          />
        </g>
      </svg>
    </button>
  );
};
