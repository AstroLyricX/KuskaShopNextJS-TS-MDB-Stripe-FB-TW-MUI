interface NullDataProps {
  title: String;
}

export const NullData: React.FC<NullDataProps> = ({ title }) => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl">
      <p className="font-semibold">{title}</p>
    </div>
  );
};
