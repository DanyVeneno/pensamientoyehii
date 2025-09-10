import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TestTube, Users, Clipboard, AlertTriangle, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhaseTestProps {
  onComplete: () => void;
}

export const PhaseTest = ({ onComplete }: PhaseTestProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    metodo1: "",
    tareas1: "",
    feedback1: "",
    metodo2: "",
    tareas2: "",
    feedback2: "",
    feedbackNegativo: "",
    iteracion: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = Object.keys(formData);
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos del plan de testeo.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Fase de Testeo completada",
      description: "Has definido exitosamente el plan de validación con usuarios.",
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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-success bg-clip-text text-transparent">
          Fase de Testeo
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Valida tus prototipos con usuarios reales para obtener feedback y iterar hacia la mejor solución
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Plan de Testeo - Prototipo 1 */}
        <Card className="shadow-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TestTube className="w-5 h-5" />
              Plan de Testeo - Prototipo #1
            </CardTitle>
            <CardDescription>
              Define cómo probarás tu primer prototipo con usuarios reales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="metodo1">Método de Testeo</Label>
              <Textarea
                id="metodo1"
                placeholder="ej. Test de usabilidad con 5 estudiantes de primer año usando el storyboard. Sesiones individuales de 30 minutos donde narran cada panel y expresan sus reacciones..."
                value={formData.metodo1}
                onChange={(e) => handleInputChange('metodo1', e.target.value)}
                className="mt-2 min-h-20"
              />
            </div>

            <div>
              <Label htmlFor="tareas1">Tareas Específicas (2-3 tareas)</Label>
              <Textarea
                id="tareas1"
                placeholder="ej.
1. Observa el storyboard y describe qué está pasando en cada panel
2. Explica si usarías esta app y por qué
3. Identifica qué parte del proceso te genera más confianza o dudas"
                value={formData.tareas1}
                onChange={(e) => handleInputChange('tareas1', e.target.value)}
                className="mt-2 min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="feedback1">Métricas Cualitativas - ¿Qué feedback buscarías?</Label>
              <Textarea
                id="feedback1"
                placeholder="ej. Nivel de comprensión del concepto, emociones generadas (confianza, ansiedad), identificación de puntos de fricción, palabras que usan para describir la experiencia..."
                value={formData.feedback1}
                onChange={(e) => handleInputChange('feedback1', e.target.value)}
                className="mt-2 min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Plan de Testeo - Prototipo 2 */}
        <Card className="shadow-card border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <TestTube className="w-5 h-5" />
              Plan de Testeo - Prototipo #2
            </CardTitle>
            <CardDescription>
              Define cómo probarás tu segundo prototipo con usuarios reales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="metodo2">Método de Testeo</Label>
              <Textarea
                id="metodo2"
                placeholder="ej. Sesión de feedback con 3 coordinadores académicos usando la maqueta digital en Figma. Presentación de 20 minutos seguida de interacción guiada con el prototipo..."
                value={formData.metodo2}
                onChange={(e) => handleInputChange('metodo2', e.target.value)}
                className="mt-2 min-h-20"
              />
            </div>

            <div>
              <Label htmlFor="tareas2">Tareas Específicas (2-3 tareas)</Label>
              <Textarea
                id="tareas2"
                placeholder="ej.
1. Navega por el dashboard y explica qué información ves
2. Simula recibir una alerta de riesgo y describe qué harías
3. Evalúa si esta herramienta te ayudaría en tu trabajo diario"
                value={formData.tareas2}
                onChange={(e) => handleInputChange('tareas2', e.target.value)}
                className="mt-2 min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="feedback2">Métricas Cualitativas - ¿Qué feedback buscarías?</Label>
              <Textarea
                id="feedback2"
                placeholder="ej. Claridad de la información presentada, facilidad de interpretación de alertas, integración con flujos de trabajo existentes, percepción de utilidad..."
                value={formData.feedback2}
                onChange={(e) => handleInputChange('feedback2', e.target.value)}
                className="mt-2 min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Iteraciones */}
        <Card className="shadow-card border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <RotateCcw className="w-5 h-5" />
              Iteraciones Basadas en Feedback
            </CardTitle>
            <CardDescription>
              Anticipa posibles problemas y define cómo mejorarías los prototipos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="feedbackNegativo">Feedback Negativo Posible</Label>
              <Textarea
                id="feedbackNegativo"
                placeholder="ej. Los usuarios sienten que el proceso de matching con mentores es demasiado complejo y no confían en que la app encuentre a la persona adecuada para ellos..."
                value={formData.feedbackNegativo}
                onChange={(e) => handleInputChange('feedbackNegativo', e.target.value)}
                className="mt-2 min-h-20"
              />
            </div>

            <div>
              <Label htmlFor="iteracion">Iteración Concreta para Mejorar</Label>
              <Textarea
                id="iteracion"
                placeholder="ej. Simplificar el proceso de matching a 3 preguntas básicas y mostrar perfiles de mentores con testimonios reales de estudiantes que han sido ayudados anteriormente..."
                value={formData.iteracion}
                onChange={(e) => handleInputChange('iteracion', e.target.value)}
                className="mt-2 min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Mejores Prácticas */}
        <Card className="bg-gradient-subtle border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">💡 Mejores Prácticas para Testeo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">✅ Qué SÍ hacer</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hacer preguntas abiertas: "¿Qué piensas de...?"</li>
                  <li>• Observar lenguaje corporal y emociones</li>
                  <li>• Dejar que hablen sin interrumpir</li>
                  <li>• Tomar notas de citas textuales</li>
                  <li>• Preguntar "¿por qué?" para profundizar</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-destructive">❌ Qué NO hacer</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Explicar cómo "deberían" usar el prototipo</li>
                  <li>• Defender o justificar el diseño</li>
                  <li>• Hacer preguntas que sugieren respuestas</li>
                  <li>• Testear con familiares o amigos</li>
                  <li>• Buscar solo confirmación de ideas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            className="bg-gradient-success shadow-button hover:shadow-elegant transition-all duration-300"
          >
            Continuar a Resultados Finales
            <TestTube className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};