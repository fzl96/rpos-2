interface CardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  background: string;
  value: number;
}

function Card({ title, subtitle, icon, background, value }: CardProps) {
  return (
    <div
      className={`flex flex-col first:md:col-span-1 first:col-span-full gap-5 p-5 rounded-2xl ${background} shadow-lg`}
    >
      <div className="flex items-center gap-5">
        <div className="flex flex-col">
          <h1 className="text-3xl">{icon}</h1>
          <h1 className="font-bold text-xl mt-2">{title}</h1>
          <h1 className="text-sm font-medium text-[#5c6473]">{subtitle}</h1>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">
          {title === 'Pendapatan'
            ? new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(value)
            : value}
        </h1>
        <div className="flex items-center justify-center w-8 h-8 rounded-md" />
      </div>
    </div>
  );
}

export default Card;
