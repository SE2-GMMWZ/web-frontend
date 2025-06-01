import { ArrowLeft } from "lucide-react";

type PageLayoutProps = {
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
};

export default function PageLayout({ title, onBack, children }: PageLayoutProps) {
  return (
    <div className="p-6 flex flex-col gap-6 mx-7 my-7">
      <div className="flex items-center gap-4">
        {onBack && <ArrowLeft className="cursor-pointer" onClick={onBack} />}
        <h1 className="text-4xl font-semibold">{title}</h1>
      </div>
      {children}
    </div>
  );
}
