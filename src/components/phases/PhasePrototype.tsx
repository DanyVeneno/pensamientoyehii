import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Rocket, Smartphone, Figma, Users, FileText, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhasePrototypeProps {
  onComplete: () => void;
}

const prototypeTypes = [
  { 
    id: "storyboard", 
    name: "Storyboard", 
    icon: FileText,
    description: "Narrativa visual que muestra la experiencia del usuario paso a paso"
  },
  { 
    id: "figma", 
    name: "Maqueta Digital", 
    icon: Figma,
    description: "Prototipo interactivo en Figma o herramienta similar"
  },
  { 
    id: "physical", 
    name: "Prototipo Físico", 
    icon: Smartphone,
    description: "Modelo tangible o maqueta física"
  },
  { 
    id: "roleplay", 
    name: "Role-Playing", 
    icon: Users,
    description: "Simulación de servicio actuando la experiencia"
  },
  { 
    id: "wizard", 
    name: "Wizard of Oz", 
    icon: Play,
    description: "Simulación manual del funcionamiento automatizado"
  }
];

export const PhasePrototype = ({ onComplete }: PhasePrototypeProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    prototipo1Tipo: "",
    prototipo1Descripcion: "",
    prototipo1Aspecto: "",
    prototipo2Tipo: "",
    prototipo2Descripcion: "",
    prototipo2Aspecto: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = Object.keys(formData);
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos para ambos prototipos.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Fase de Prototipado completada",
      description: "Has definido exitosamente los prototipos para tus ideas.",
    });
    
    onComplete();
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTextChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPrototypeIcon = (typeId: string) => {
    const type = prototypeTypes.find(t => t.id === typeId);
    return type ? type.icon : Rocket;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
          Fase de Prototipado
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Construye versiones tangibles y testeables de tus ideas seleccionadas para validar los conceptos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Tipos de Prototipos */}
        <Card className="bg-gradient-subtle border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Tipos de Prototipos Disponibles</CardTitle>
            <CardDescription>
              Cada tipo de prototipo permite validar diferentes aspectos de tu solución
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prototypeTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.id} className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">{type.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Prototipo 1 */}
        <Card className="shadow-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Rocket className="w-5 h-5" />
              Prototipo para Idea #1
            </CardTitle>
            <CardDescription>
              Define el tipo de prototipo más adecuado para tu primera idea
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="prototipo1Tipo">Tipo de Prototipo</Label>
              <Select value={formData.prototipo1Tipo} onValueChange={(value) => handleSelectChange('prototipo1Tipo', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecciona el tipo de prototipo" />
                </SelectTrigger>
                <SelectContent>
                  {prototypeTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="prototipo1Descripcion">Descripción del Prototipo</Label>
              <Textarea
                id="prototipo1Descripcion"
                placeholder="ej. Storyboard de 6 paneles que muestra cómo María descarga la app, se registra, es emparejada con un mentor, tiene su primera videollamada, recibe apoyo académico y comparte su progreso..."
                value={formData.prototipo1Descripcion}
                onChange={(e) => handleTextChange('prototipo1Descripcion', e.target.value)}
                className="mt-2 min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="prototipo1Aspecto">Aspecto Clave a Validar</Label>
              <Textarea
                id="prototipo1Aspecto"
                placeholder="ej. Validar si los usuarios comprenden el flujo de matching con mentores y si la propuesta de valor es clara desde el primer contacto..."
                value={formData.prototipo1Aspecto}
                onChange={(e) => handleTextChange('prototipo1Aspecto', e.target.value)}
                className="mt-2 min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Prototipo 2 */}
        <Card className="shadow-card border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <Rocket className="w-5 h-5" />
              Prototipo para Idea #2
            </CardTitle>
            <CardDescription>
              Define el tipo de prototipo más adecuado para tu segunda idea
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="prototipo2Tipo">Tipo de Prototipo</Label>
              <Select value={formData.prototipo2Tipo} onValueChange={(value) => handleSelectChange('prototipo2Tipo', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecciona el tipo de prototipo" />
                </SelectTrigger>
                <SelectContent>
                  {prototypeTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="prototipo2Descripcion">Descripción del Prototipo</Label>
              <Textarea
                id="prototipo2Descripcion"
                placeholder="ej. Maqueta digital en Figma que simula el dashboard de alertas tempranas, mostrando los indicadores de riesgo, notificaciones automáticas y flujo de derivación a recursos de apoyo..."
                value={formData.prototipo2Descripcion}
                onChange={(e) => handleTextChange('prototipo2Descripcion', e.target.value)}
                className="mt-2 min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="prototipo2Aspecto">Aspecto Clave a Validar</Label>
              <Textarea
                id="prototipo2Aspecto"
                placeholder="ej. Comprobar si los indicadores de riesgo son comprensibles para los coordinadores académicos y si el sistema de alertas genera acciones efectivas..."
                value={formData.prototipo2Aspecto}
                onChange={(e) => handleTextChange('prototipo2Aspecto', e.target.value)}
                className="mt-2 min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Ejemplos Prácticos */}
        <Card className="bg-gradient-subtle border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">💡 Ejemplos de Prototipos Efectivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/10 text-primary">Storyboard</Badge>
                  <h4 className="font-semibold">App de Mentoring</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Valida:</strong> Flujo de usuario y comprensión del valor
                </p>
                <p className="text-xs text-muted-foreground">
                  6 viñetas mostrando: descarga → registro → matching → primera sesión → seguimiento → resultados
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-success/10 text-success">Wizard of Oz</Badge>
                  <h4 className="font-semibold">Sistema de Alertas</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Valida:</strong> Efectividad de las alertas y respuesta del staff
                </p>
                <p className="text-xs text-muted-foreground">
                  Simulación manual donde el equipo envía alertas "automáticas" a coordinadores
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            className="bg-gradient-secondary shadow-button hover:shadow-elegant transition-all duration-300"
          >
            Continuar a Fase de Testeo
            <Rocket className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};