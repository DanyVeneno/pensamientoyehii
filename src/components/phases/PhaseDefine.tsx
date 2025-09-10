import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Target, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhaseDefineProps {
  onComplete: () => void;
}

export const PhaseDefine = ({ onComplete }: PhaseDefineProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    personaNombre: "",
    personaEdad: "",
    personaOcupacion: "",
    personaMotivaciones: "",
    personaFrustraciones: "",
    personaCita: "",
    pointOfView: "",
    hmw1: "",
    hmw2: "",
    hmw3: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = Object.keys(formData).filter(key => key !== 'personaEdad');
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Fase de Definición completada",
      description: "Has creado exitosamente la persona y definido el problema.",
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
          Fase de Definición
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Sintetiza los hallazgos de la investigación en una persona clara y un problema bien definido
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Persona */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Creación de Persona
            </CardTitle>
            <CardDescription>
              Crea una persona fictiva pero realista basada en los hallazgos de investigación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="personaNombre">Nombre completo</Label>
                <Input
                  id="personaNombre"
                  placeholder="ej. María González"
                  value={formData.personaNombre}
                  onChange={(e) => handleInputChange('personaNombre', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="personaEdad">Edad</Label>
                <Input
                  id="personaEdad"
                  placeholder="ej. 19"
                  value={formData.personaEdad}
                  onChange={(e) => handleInputChange('personaEdad', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="personaOcupacion">Ocupación</Label>
                <Input
                  id="personaOcupacion"
                  placeholder="ej. Estudiante de Ingeniería"
                  value={formData.personaOcupacion}
                  onChange={(e) => handleInputChange('personaOcupacion', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="personaMotivaciones">Motivaciones principales</Label>
                <Textarea
                  id="personaMotivaciones"
                  placeholder="ej. Quiere sentirse preparada para el futuro profesional, busca desarrollar habilidades prácticas, valora el aprendizaje colaborativo..."
                  value={formData.personaMotivaciones}
                  onChange={(e) => handleInputChange('personaMotivaciones', e.target.value)}
                  className="mt-2 min-h-24"
                />
              </div>
              <div>
                <Label htmlFor="personaFrustraciones">Frustraciones principales</Label>
                <Textarea
                  id="personaFrustraciones"
                  placeholder="ej. Se siente perdida sin orientación clara, la carga académica la abruma, le falta conexión social con compañeros..."
                  value={formData.personaFrustraciones}
                  onChange={(e) => handleInputChange('personaFrustraciones', e.target.value)}
                  className="mt-2 min-h-24"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="personaCita">Cita que la define</Label>
              <Textarea
                id="personaCita"
                placeholder='ej. "Vine a la universidad con muchas expectativas, pero a veces siento que estoy navegando sin brújula. Necesito saber que voy por el camino correcto."'
                value={formData.personaCita}
                onChange={(e) => handleInputChange('personaCita', e.target.value)}
                className="mt-2 min-h-16"
              />
            </div>
          </CardContent>
        </Card>

        {/* Point of View */}
        <Card className="shadow-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Target className="w-5 h-5" />
              Declaración de Punto de Vista (POV)
            </CardTitle>
            <CardDescription>
              Fórmula: "[Persona] necesita una forma de [necesidad] porque [insight profundo]"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="pointOfView">Point of View Statement</Label>
            <Textarea
              id="pointOfView"
              placeholder='ej. "María González necesita una forma de sentirse acompañada y orientada en su proceso académico porque valora pertenecer a una comunidad que la apoye en su crecimiento personal y profesional."'
              value={formData.pointOfView}
              onChange={(e) => handleInputChange('pointOfView', e.target.value)}
              className="mt-2 min-h-20"
            />
          </CardContent>
        </Card>

        {/* How Might We */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-accent" />
              Preguntas "How Might We?" (HMW)
            </CardTitle>
            <CardDescription>
              Genera 3 preguntas HMW que aborden diferentes ángulos del problema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="hmw1">HMW #1 - Enfoque en el usuario</Label>
              <Textarea
                id="hmw1"
                placeholder='ej. "¿Cómo podríamos ayudar a María a sentirse más conectada con una comunidad de apoyo académico?"'
                value={formData.hmw1}
                onChange={(e) => handleInputChange('hmw1', e.target.value)}
                className="mt-2 min-h-16"
              />
            </div>

            <div>
              <Label htmlFor="hmw2">HMW #2 - Enfoque en la experiencia</Label>
              <Textarea
                id="hmw2"
                placeholder='ej. "¿Cómo podríamos diseñar una experiencia de orientación académica que sea personalizada y continua?"'
                value={formData.hmw2}
                onChange={(e) => handleInputChange('hmw2', e.target.value)}
                className="mt-2 min-h-16"
              />
            </div>

            <div>
              <Label htmlFor="hmw3">HMW #3 - Enfoque en el sistema</Label>
              <Textarea
                id="hmw3"
                placeholder='ej. "¿Cómo podríamos crear un sistema que identifique tempranamente a estudiantes en riesgo y los conecte con recursos de apoyo?"'
                value={formData.hmw3}
                onChange={(e) => handleInputChange('hmw3', e.target.value)}
                className="mt-2 min-h-16"
              />
            </div>
          </CardContent>
        </Card>

        {/* Ejemplo Visual */}
        <Card className="bg-gradient-subtle border-success/20">
          <CardHeader>
            <CardTitle className="text-success">💡 Ejemplo Completo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-primary mb-2">Persona: Ana Rodríguez, 19 años</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Ocupación:</strong> Estudiante de primer año de Administración<br/>
                <strong>Motivaciones:</strong> Quiere tener un futuro profesional exitoso, aprende mejor con ejemplos prácticos<br/>
                <strong>Frustraciones:</strong> Se siente perdida en las clases teóricas, no sabe cómo aplicar lo que aprende
              </p>
              <blockquote className="border-l-4 border-primary pl-3 italic text-sm">
                "Entré a la universidad emocionada, pero ahora me pregunto si esto realmente me servirá en el mundo real."
              </blockquote>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-primary mb-2">POV Statement</h4>
              <p className="text-sm">
                "Ana Rodríguez necesita una forma de <strong>conectar el aprendizaje teórico con aplicaciones prácticas reales</strong> porque <strong>aprende mejor cuando puede ver el valor inmediato de lo que estudia</strong>."
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            className="bg-gradient-success shadow-button hover:shadow-elegant transition-all duration-300"
          >
            Continuar a Fase de Ideación
            <Target className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};