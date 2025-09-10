import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Trophy, TrendingUp, Target, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhaseResultsProps {
  onComplete: () => void;
}

export const PhaseResults = ({ onComplete }: PhaseResultsProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    mvpDescripcion: "",
    mvpFuncionalidades: "",
    mvpTimeline: "",
    kpi1: "",
    kpi1Meta: "",
    kpi2: "",
    kpi2Meta: "",
    kpi3: "",
    kpi3Meta: "",
    proximosPasos: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = ['mvpDescripcion', 'mvpFuncionalidades', 'kpi1', 'kpi2'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa al menos la descripción del MVP y 2 KPIs.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Caso de Design Thinking completado!",
      description: "Has desarrollado exitosamente un caso completo de innovación.",
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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          Resultados y Conclusiones
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Define el MVP final y las métricas de éxito basándote en todo el proceso de Design Thinking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* MVP Definition */}
        <Card className="shadow-elegant border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Trophy className="w-5 h-5" />
              Producto Mínimo Viable (MVP)
            </CardTitle>
            <CardDescription>
              Basándote en el testeo y feedback, define qué lanzarías primero
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="mvpDescripcion">Descripción del MVP</Label>
              <Textarea
                id="mvpDescripcion"
                placeholder="ej. App móvil de mentoring peer-to-peer que conecta estudiantes de primer año con mentores de años superiores, incluyendo sistema de matching básico, videollamadas integradas y seguimiento de progreso mensual..."
                value={formData.mvpDescripcion}
                onChange={(e) => handleInputChange('mvpDescripcion', e.target.value)}
                className="mt-2 min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="mvpFuncionalidades">Funcionalidades Clave del MVP</Label>
              <Textarea
                id="mvpFuncionalidades"
                placeholder="ej.
1. Registro y perfil básico de estudiantes y mentores
2. Sistema de matching basado en carrera y disponibilidad
3. Chat integrado para comunicación
4. Programación de sesiones de mentoring
5. Sistema básico de feedback post-sesión"
                value={formData.mvpFuncionalidades}
                onChange={(e) => handleInputChange('mvpFuncionalidades', e.target.value)}
                className="mt-2 min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="mvpTimeline">Timeline de Desarrollo (opcional)</Label>
              <Textarea
                id="mvpTimeline"
                placeholder="ej. Fase 1 (2 meses): Desarrollo core de matching y chat. Fase 2 (1 mes): Testing con 50 usuarios. Fase 3 (1 mes): Iteraciones y lanzamiento beta..."
                value={formData.mvpTimeline}
                onChange={(e) => handleInputChange('mvpTimeline', e.target.value)}
                className="mt-2 min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Métricas de Éxito (KPIs)
            </CardTitle>
            <CardDescription>
              2-3 métricas cuantitativas para medir el éxito una vez implementado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kpi1">KPI #1</Label>
                <Input
                  id="kpi1"
                  placeholder="ej. Tasa de retención estudiantil"
                  value={formData.kpi1}
                  onChange={(e) => handleInputChange('kpi1', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="kpi1Meta">Meta objetivo</Label>
                <Input
                  id="kpi1Meta"
                  placeholder="ej. Reducir deserción del 35% al 20%"
                  value={formData.kpi1Meta}
                  onChange={(e) => handleInputChange('kpi1Meta', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kpi2">KPI #2</Label>
                <Input
                  id="kpi2"
                  placeholder="ej. Satisfacción estudiantil"
                  value={formData.kpi2}
                  onChange={(e) => handleInputChange('kpi2', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="kpi2Meta">Meta objetivo</Label>
                <Input
                  id="kpi2Meta"
                  placeholder="ej. Alcanzar NPS de 70+ en primer año"
                  value={formData.kpi2Meta}
                  onChange={(e) => handleInputChange('kpi2Meta', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kpi3">KPI #3 (opcional)</Label>
                <Input
                  id="kpi3"
                  placeholder="ej. Adopción de la app"
                  value={formData.kpi3}
                  onChange={(e) => handleInputChange('kpi3', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="kpi3Meta">Meta objetivo</Label>
                <Input
                  id="kpi3Meta"
                  placeholder="ej. 80% de estudiantes activos mensualmente"
                  value={formData.kpi3Meta}
                  onChange={(e) => handleInputChange('kpi3Meta', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Pasos */}
        <Card className="shadow-card border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Target className="w-5 h-5" />
              Próximos Pasos Recomendados
            </CardTitle>
            <CardDescription>
              Plan de acción para implementar la solución
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="proximosPasos">Roadmap de implementación</Label>
            <Textarea
              id="proximosPasos"
              placeholder="ej.
1. Validar MVP con 100 estudiantes en piloto de 3 meses
2. Desarrollar partnerships con estudiantes mentores senior
3. Crear programa de incentivos para participación
4. Establecer métricas de seguimiento y dashboards
5. Planificar escalamiento a otras universidades del grupo"
              value={formData.proximosPasos}
              onChange={(e) => handleInputChange('proximosPasos', e.target.value)}
              className="mt-2 min-h-32"
            />
          </CardContent>
        </Card>

        {/* Resumen del Proceso */}
        <Card className="bg-gradient-hero text-white shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              ¡Felicitaciones! Has Completado el Caso de Design Thinking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <h4 className="font-semibold mb-2">Proceso Completo</h4>
                <p className="text-white/90 text-sm">7 fases metodológicas completadas siguiendo estándares IDEO</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usuario Centrado</h4>
                <p className="text-white/90 text-sm">Solución validada con usuarios reales y feedback incorporado</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Listo para Implementar</h4>
                <p className="text-white/90 text-sm">MVP definido con métricas claras de éxito</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="text-sm">
            Caso completado exitosamente
          </Badge>
          <div className="flex gap-4">
            <Button 
              type="button"
              variant="outline"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar Caso
            </Button>
            <Button 
              type="submit" 
              size="lg" 
              className="bg-gradient-hero shadow-button hover:shadow-elegant transition-all duration-300 gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Finalizar Caso
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};