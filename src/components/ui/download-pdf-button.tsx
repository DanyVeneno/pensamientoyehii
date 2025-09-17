import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DownloadPDFButtonProps {
  isFormValid: boolean;
  onDownload: () => void;
  phaseName: string;
  className?: string;
}

export const DownloadPDFButton = ({ 
  isFormValid, 
  onDownload, 
  phaseName, 
  className 
}: DownloadPDFButtonProps) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (!isFormValid) {
      toast({
        title: "Campos incompletos",
        description: `Por favor completa todos los campos de la fase ${phaseName} antes de descargar el PDF.`,
        variant: "destructive"
      });
      return;
    }
    
    onDownload();
    toast({
      title: "PDF generado",
      description: `Se ha descargado el PDF de la fase ${phaseName} exitosamente.`,
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant={isFormValid ? "default" : "secondary"}
      className={`gap-2 ${className}`}
      disabled={!isFormValid}
    >
      <Download className="w-4 h-4" />
      Descargar PDF - {phaseName}
    </Button>
  );
};