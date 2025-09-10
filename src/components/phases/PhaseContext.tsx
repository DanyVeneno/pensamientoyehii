import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building, Target, History, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhaseContextProps {
  onComplete: () => void;
}

export const PhaseContext = ({ onComplete }: PhaseContextProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    empresa: "",
    industria: "",
    historia: "",
    desafio: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.empresa || !formData.industria || !formData.historia || !formData.desafio) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Contexto empresarial definido",
      description: "Has completado exitosamente la definición del contexto.",
    });
    
    onComplete();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Contexto Empresarial
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Define la empresa y el desafío específico que abordaremos en este caso de Design Thinking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Empresa */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Empresa
              </CardTitle>
              <CardDescription>
                Nombre y descripción general de la empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="empresa">Nombre de la empresa</Label>
                <Input
                  id="empresa"
                  placeholder="ej. TechCorp, SuperMercados del Sur, Universidad Innovadora"
                  value={formData.empresa}
                  onChange={(e) => handleInputChange('empresa', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="industria">Industria</Label>
                <Input
                  id="industria"
                  placeholder="ej. Retail, Educación, Salud, Logística, Fintech"
                  value={formData.industria}
                  onChange={(e) => handleInputChange('industria', e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Historia */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-accent" />
                Historia y Modelo de Negocio
              </CardTitle>
              <CardDescription>
                Trayectoria y funcionamiento tradicional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="historia">Breve historia y modelo actual</Label>
                <Textarea
                  id="historia"
                  placeholder="Describe la trayectoria de la empresa, cuándo se fundó, su modelo de negocio tradicional, principales servicios/productos, y cómo ha operado hasta ahora..."
                  value={formData.historia}
                  onChange={(e) => handleInputChange('historia', e.target.value)}
                  className="mt-2 min-h-32"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desafío */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              El Desafío Macro
            </CardTitle>
            <CardDescription>
              El problema general que enfrenta la empresa y que abordaremos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="desafio">Describe el desafío principal</Label>
              <Textarea
                id="desafio"
                placeholder="ej. 'Falta de engagement con clientes millennials', 'Altas tasas de abandono de estudiantes en primer año', 'Procesos internos ineficientes que causan retrasos en la entrega', 'Dificultad para competir con plataformas digitales'..."
                value={formData.desafio}
                onChange={(e) => handleInputChange('desafio', e.target.value)}
                className="mt-2 min-h-32"
              />
            </div>
          </CardContent>
        </Card>

        {/* Ejemplos */}
        <Card className="bg-gradient-subtle border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">💡 Ejemplos de Contextos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-primary mb-2">Cadena de Supermercados</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Industria:</strong> Retail<br/>
                  <strong>Historia:</strong> 25 años en el mercado, modelo tradicional de tiendas físicas<br/>
                  <strong>Desafío:</strong> Competencia feroz con e-commerce y pérdida de clientes jóvenes
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-primary mb-2">Universidad Privada</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Industria:</strong> Educación<br/>
                  <strong>Historia:</strong> 40 años formando profesionales, métodos de enseñanza tradicionales<br/>
                  <strong>Desafío:</strong> Alta deserción estudiantil en primeros años (35%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            className="bg-gradient-primary shadow-button hover:shadow-elegant transition-all duration-300"
          >
            Continuar a Fase de Empatía
            <Target className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};