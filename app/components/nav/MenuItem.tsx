// interface MenuItemProps {
//   children: React.ReactNode;
//   onClick: () => void;
// }

// export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="px-4 py-3 hover:bg-neutral-100 transition"
//     >
//       {children}
//     </div>
//   );
// };

interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); // Evitar la propagación del evento
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className="px-4 py-3 hover:bg-neutral-100 transition"
      role="menuitem" // Añadir atributo ARIA
      tabIndex={0} // Hacer el elemento enfocable para la navegación por teclado
    >
      {children}
    </div>
  );
};
