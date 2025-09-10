import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Search, MessageSquare, Eye, Lightbulb, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhaseEmpathizeProps {
  onComplete: () => void;
}

const researchTechniques = [
  { id: "interviews", name: "Entrevistas en profundidad", icon: MessageSquare },
  { id: "shadowing", name: "Shadowing (observación)", icon: Eye },
  { id: "surveys", name: "Encuestas cuantitativas", icon: Search },
  { id: "focus_groups", name: "Grupos focales", icon: Users },
  { id: "immersion", name: "Inmersión contextual", icon: Heart },
  { id: "benchmarking", name: "Benchmarking competitivo", icon: Lightbulb }
];

export const PhaseEmpathize = ({ onComplete }: PhaseEmpathizeProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    objetivo: "",
    usuarioObjetivo: "",
    tecnicas: [] as string[],
    preguntas: "",
    frustraciones: "",
    insightPositivo: "",
    metaInsight: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = ['objetivo', 'usuarioObjetivo', 'preguntas', 'frustraciones', 'insightPositivo', 'metaInsight'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0 || formData.tecnicas.length < 2) {
      toast({
        title: "Campos incompletos",
        description: "Completa todos los campos y selecciona al menos 2 técnicas de investigación.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Fase de Empatía completada",
      description: "Has definido exitosamente la investigación de usuarios.",
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
          Fase de Empatía
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprende profundamente a tus usuarios a través de investigación cualitativa y cuantitativa
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Objetivo y Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Objetivo de Investigación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="objetivo">¿Qué queremos entender?</Label>
              <Textarea
                id="objetivo"
                placeholder="ej. Entender por qué los estudiantes abandonan la universidad en primer año y qué factores podrían motivarlos a continuar..."
                value={formData.objetivo}
                onChange={(e) => setFormData(prev => ({ ...prev, objetivo: e.target.value }))}
                className="mt-2 min-h-24"
              />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Usuario Objetivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="usuarioObjetivo">Segmento específico a estudiar</Label>
              <Textarea
                id="usuarioObjetivo"
                placeholder="ej. Estudiantes de 18-20 años que dejaron la universidad en primer año, padres de familia trabajadores con hijos pequeños, adultos mayores que viven solos..."
                value={formData.usuarioObjetivo}
                onChange={(e) => setFormData(prev => ({ ...prev, usuarioObjetivo: e.target.value }))}
                className="mt-2 min-h-24"
              />
            </CardContent>
          </Card>
        </div>

        {/* Técnicas de Investigación */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Técnicas de Investigación</CardTitle>
            <CardDescription>
              Selecciona al menos 2 técnicas para tu investigación (recomendado: 3-4)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {researchTechniques.map((technique) => {
                const Icon = technique.icon;
                return (
                  <div
                    key={technique.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={technique.id}
                      checked={formData.tecnicas.includes(technique.id)}
                      onCheckedChange={(checked) => 
                        handleTechniqueChange(technique.id, checked as boolean)
                      }
                    />
                    <Icon className="w-4 h-4 text-primary" />
                    <Label htmlFor={technique.id} className="cursor-pointer flex-1">
                      {technique.name}
                    </Label>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Preguntas Clave */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Preguntas Clave para Entrevistas</CardTitle>
            <CardDescription>
              5-7 preguntas abiertas que harías en las entrevistas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="ej.
1. ¿Cuéntame sobre tu experiencia en el primer año de universidad?
2. ¿Qué fue lo más desafiante que enfrentaste?
3. ¿Cómo era un día típico para ti como estudiante?
4. ¿Qué tipo de apoyo recibiste y cuál necesitabas?
5. Si pudieras cambiar algo de tu experiencia, ¿qué sería?"
              value={formData.preguntas}
              onChange={(e) => setFormData(prev => ({ ...prev, preguntas: e.target.value }))}
              className="min-h-32"
            />
          </CardContent>
        </Card>

        {/* Hallazgos */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Hallazgos Esperados de la Investigación</h3>
          
          <Card className="shadow-card border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Frustraciones y Dolores</CardTitle>
              <CardDescription>
                Al menos 3 cosas que odian o que les roban tiempo/energía
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="ej.
1. Se sienten perdidos sin orientación académica clara
2. La carga de trabajo es abrumadora sin herramientas de organización
3. Falta de conexión social hace que se sientan aislados"
                value={formData.frustraciones}
                onChange={(e) => setFormData(prev => ({ ...prev, frustraciones: e.target.value }))}
                className="min-h-24"
              />
            </CardContent>
          </Card>

          <Card className="shadow-card border-success/20">
            <CardHeader>
              <CardTitle className="text-success">Insight Positivo</CardTitle>
              <CardDescription>
                Algo que valoran o que les da alegría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="ej. Valoran mucho los momentos de aprendizaje práctico donde pueden aplicar lo que estudian a situaciones reales"
                value={formData.insightPositivo}
                onChange={(e) => setFormData(prev => ({ ...prev, insightPositivo: e.target.value }))}
                className="min-h-20"
              />
            </CardContent>
          </Card>

          <Card className="shadow-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Meta-Insight</CardTitle>
              <CardDescription>
                La necesidad emocional profunda no expresada directamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="ej. Necesitan sentir que pertenecen a una comunidad que los apoya en su crecimiento personal y profesional"
                value={formData.metaInsight}
                onChange={(e) => setFormData(prev => ({ ...prev, metaInsight: e.target.value }))}
                className="min-h-20"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            className="bg-gradient-secondary shadow-button hover:shadow-elegant transition-all duration-300"
          >
            Continuar a Fase de Definición
            <Users className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};