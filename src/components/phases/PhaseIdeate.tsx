import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Zap, Target, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhaseIdeateProps {
  onComplete: () => void;
}

const ideationTechniques = [
  { 
    id: "brainstorming", 
    name: "Brainstorming Clásico", 
    description: "Generar muchas ideas sin juzgar"
  },
  { 
    id: "worst_idea", 
    name: "Worst Possible Idea", 
    description: "Pensar las peores ideas para liberar creatividad"
  },
  { 
    id: "scamper", 
    name: "SCAMPER", 
    description: "Sustituir, Combinar, Adaptar, Modificar, etc."
  },
  { 
    id: "six_thinking_hats", 
    name: "Seis Sombreros", 
    description: "Perspectivas diferentes: lógico, emocional, creativo"
  },
  { 
    id: "brainwriting", 
    name: "Brainwriting 6-3-5", 
    description: "Escribir ideas silenciosamente y luego compartir"
  }
];

export const PhaseIdeate = ({ onComplete }: PhaseIdeateProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tecnicas: [] as string[],
    ideas: "",
    idea1: "",
    idea1Factibilidad: "",
    idea1Viabilidad: "",
    idea1Deseabilidad: "",
    idea2: "",
    idea2Factibilidad: "",
    idea2Viabilidad: "",
    idea2Deseabilidad: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = ['ideas', 'idea1', 'idea1Factibilidad', 'idea1Viabilidad', 'idea1Deseabilidad', 
                           'idea2', 'idea2Factibilidad', 'idea2Viabilidad', 'idea2Deseabilidad'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0 || formData.tecnicas.length < 2) {
      toast({
        title: "Campos incompletos",
        description: "Completa todos los campos y selecciona al menos 2 técnicas de ideación.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Fase de Ideación completada",
      description: "Has generado y evaluado exitosamente las ideas de solución.",
    });
    
    onComplete();
  };

  const handleTechniqueChange = (techniqueId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tecnicas: checked 
        ? [...prev.tecnicas, techniqueId]
        : prev.tecnicas.filter(t => t !== techniqueId)
    }));
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
          Fase de Ideación
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Genera múltiples soluciones creativas para abordar las preguntas HMW definidas anteriormente
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Técnicas de Ideación */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Técnicas de Ideación para Workshop
            </CardTitle>
            <CardDescription>
              Selecciona al menos 2 técnicas que usarías en tu sesión de ideación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ideationTechniques.map((technique) => (
                <div
                  key={technique.id}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={technique.id}
                    checked={formData.tecnicas.includes(technique.id)}
                    onCheckedChange={(checked) => 
                      handleTechniqueChange(technique.id, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={technique.id} className="cursor-pointer font-medium">
                      {technique.name}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {technique.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Ideas */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Lluvia de Ideas
            </CardTitle>
            <CardDescription>
              Genera al menos 5 ideas diversas de solución que respondan a las preguntas HMW
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="ideas">Lista de ideas generadas</Label>
            <Textarea
              id="ideas"
              placeholder="ej.
1. App móvil de mentoring peer-to-peer para conectar estudiantes
2. Sistema de alertas tempranas con IA para identificar estudiantes en riesgo
3. Programa de buddy system con estudiantes de años superiores
4. Plataforma gamificada de seguimiento de progreso académico
5. Red de apoyo interdisciplinario con profesores, psicólogos y tutores
6. Workshops regulares de habilidades de estudio y manejo del tiempo
7. Sistema de micro-learning con contenido bite-sized y aplicaciones prácticas..."
              value={formData.ideas}
              onChange={(e) => handleInputChange('ideas', e.target.value)}
              className="mt-2 min-h-40"
            />
          </CardContent>
        </Card>

        {/* Selección de Ideas */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Selección de las 2 Ideas Más Prometedoras</h3>
          <p className="text-muted-foreground">
            Evalúa cada idea basándote en los criterios de <strong>factibilidad</strong> (¿podemos hacerlo?), 
            <strong> viabilidad</strong> (¿funcionará?) y <strong>deseabilidad</strong> (¿lo quieren los usuarios?)
          </p>

          {/* Idea 1 */}
          <Card className="shadow-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target className="w-5 h-5" />
                Idea Seleccionada #1
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="idea1">Describe la primera idea seleccionada</Label>
                <Textarea
                  id="idea1"
                  placeholder="ej. App móvil de mentoring peer-to-peer que conecta estudiantes de primer año con mentores de años superiores, incluyendo sistema de matching basado en carrera y personalidad..."
                  value={formData.idea1}
                  onChange={(e) => handleInputChange('idea1', e.target.value)}
                  className="mt-2 min-h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="idea1Factibilidad">Factibilidad</Label>
                  <Textarea
                    id="idea1Factibilidad"
                    placeholder="¿Podemos hacerlo con recursos disponibles?"
                    value={formData.idea1Factibilidad}
                    onChange={(e) => handleInputChange('idea1Factibilidad', e.target.value)}
                    className="mt-2 min-h-16"
                  />
                </div>
                <div>
                  <Label htmlFor="idea1Viabilidad">Viabilidad</Label>
                  <Textarea
                    id="idea1Viabilidad"
                    placeholder="¿Funcionará como solución?"
                    value={formData.idea1Viabilidad}
                    onChange={(e) => handleInputChange('idea1Viabilidad', e.target.value)}
                    className="mt-2 min-h-16"
                  />
                </div>
                <div>
                  <Label htmlFor="idea1Deseabilidad">Deseabilidad</Label>
                  <Textarea
                    id="idea1Deseabilidad"
                    placeholder="¿Lo quieren los usuarios?"
                    value={formData.idea1Deseabilidad}
                    onChange={(e) => handleInputChange('idea1Deseabilidad', e.target.value)}
                    className="mt-2 min-h-16"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Idea 2 */}
          <Card className="shadow-card border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Target className="w-5 h-5" />
                Idea Seleccionada #2
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="idea2">Describe la segunda idea seleccionada</Label>
                <Textarea
                  id="idea2"
                  placeholder="ej. Sistema de alertas tempranas con IA que analiza patrones de comportamiento académico y conecta automáticamente estudiantes en riesgo con recursos de apoyo personalizados..."
                  value={formData.idea2}
                  onChange={(e) => handleInputChange('idea2', e.target.value)}
                  className="mt-2 min-h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="idea2Factibilidad">Factibilidad</Label>
                  <Textarea
                    id="idea2Factibilidad"
                    placeholder="¿Podemos hacerlo con recursos disponibles?"
                    value={formData.idea2Factibilidad}
                    onChange={(e) => handleInputChange('idea2Factibilidad', e.target.value)}
                    className="mt-2 min-h-16"
                  />
                </div>
                <div>
                  <Label htmlFor="idea2Viabilidad">Viabilidad</Label>
                  <Textarea
                    id="idea2Viabilidad"
                    placeholder="¿Funcionará como solución?"
                    value={formData.idea2Viabilidad}
                    onChange={(e) => handleInputChange('idea2Viabilidad', e.target.value)}
                    className="mt-2 min-h-16"
                  />
                </div>
                <div>
                  <Label htmlFor="idea2Deseabilidad">Deseabilidad</Label>
                  <Textarea
                    id="idea2Deseabilidad"
                    placeholder="¿Lo quieren los usuarios?"
                    value={formData.idea2Deseabilidad}
                    onChange={(e) => handleInputChange('idea2Deseabilidad', e.target.value)}
                    className="mt-2 min-h-16"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Criterios de Evaluación */}
        <Card className="bg-gradient-subtle border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">💡 Criterios de Evaluación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <Badge className="mb-2 bg-primary/10 text-primary">Factibilidad</Badge>
                <p className="text-sm text-muted-foreground">
                  ¿Tenemos los recursos, tiempo, presupuesto y capacidades técnicas necesarias?
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <Badge className="mb-2 bg-success/10 text-success">Viabilidad</Badge>
                <p className="text-sm text-muted-foreground">
                  ¿Es sostenible el modelo de negocio? ¿Resolverá realmente el problema?
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <Badge className="mb-2 bg-accent/10 text-accent">Deseabilidad</Badge>
                <p className="text-sm text-muted-foreground">
                  ¿Los usuarios realmente quieren esta solución? ¿Satisface sus necesidades?
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
            Continuar a Fase de Prototipado
            <Lightbulb className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};