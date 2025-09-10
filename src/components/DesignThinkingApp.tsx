import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Lightbulb, Users, Target, Rocket, TestTube, CheckCircle, ArrowLeft } from "lucide-react";
import { PhaseEmpathize } from "./phases/PhaseEmpathize";
import { PhaseDefine } from "./phases/PhaseDefine";
import { PhaseIdeate } from "./phases/PhaseIdeate";
import { PhasePrototype } from "./phases/PhasePrototype";
import { PhaseTest } from "./phases/PhaseTest";
import { PhaseResults } from "./phases/PhaseResults";
import { PhaseContext } from "./phases/PhaseContext";

const phases = [
  {
    id: 'context',
    name: 'Contexto Empresarial',
    description: 'Define la empresa y el desafío a resolver',
    icon: Target,
    color: 'bg-gradient-primary'
  },
  {
    id: 'empathize',
    name: 'Empatizar',
    description: 'Comprende profundamente a tus usuarios',
    icon: Users,
    color: 'bg-gradient-secondary'
  },
  {
    id: 'define',
    name: 'Definir',
    description: 'Sintetiza hallazgos en un problema claro',
    icon: Target,
    color: 'bg-gradient-success'
  },
  {
    id: 'ideate',
    name: 'Idear',
    description: 'Genera múltiples soluciones creativas',
    icon: Lightbulb,
    color: 'bg-gradient-primary'
  },
  {
    id: 'prototype',
    name: 'Prototipar',
    description: 'Construye versiones tangibles de tus ideas',
    icon: Rocket,
    color: 'bg-gradient-secondary'
  },
  {
    id: 'test',
    name: 'Testear',
    description: 'Valida tus prototipos con usuarios reales',
    icon: TestTube,
    color: 'bg-gradient-success'
  },
  {
    id: 'results',
    name: 'Resultados',
    description: 'Define el MVP y métricas de éxito',
    icon: CheckCircle,
    color: 'bg-gradient-primary'
  }
];

export const DesignThinkingApp = () => {
  const [currentPhase, setCurrentPhase] = useState<string | null>(null);
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());

  const handlePhaseComplete = (phaseId: string) => {
    setCompletedPhases(prev => new Set([...prev, phaseId]));
    const currentIndex = phases.findIndex(p => p.id === phaseId);
    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1].id);
    }
  };

  const progress = (completedPhases.size / phases.length) * 100;

  if (currentPhase) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentPhase(null)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Dashboard
            </Button>
            <div className="flex-1">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Progreso: {completedPhases.size} de {phases.length} fases completadas
              </p>
            </div>
          </div>

          {currentPhase === 'context' && <PhaseContext onComplete={() => handlePhaseComplete('context')} />}
          {currentPhase === 'empathize' && <PhaseEmpathize onComplete={() => handlePhaseComplete('empathize')} />}
          {currentPhase === 'define' && <PhaseDefine onComplete={() => handlePhaseComplete('define')} />}
          {currentPhase === 'ideate' && <PhaseIdeate onComplete={() => handlePhaseComplete('ideate')} />}
          {currentPhase === 'prototype' && <PhasePrototype onComplete={() => handlePhaseComplete('prototype')} />}
          {currentPhase === 'test' && <PhaseTest onComplete={() => handlePhaseComplete('test')} />}
          {currentPhase === 'results' && <PhaseResults onComplete={() => handlePhaseComplete('results')} />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Design Thinking Toolkit
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Guía paso a paso para desarrollar casos completos de innovación usando la metodología Design Thinking
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Metodología IDEO
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                7 Fases Completas
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Casos Prácticos
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Tu Progreso</CardTitle>
            <CardDescription>
              Completa todas las fases para desarrollar tu caso de Design Thinking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-3 mb-4" />
            <p className="text-sm text-muted-foreground">
              {completedPhases.size} de {phases.length} fases completadas ({Math.round(progress)}%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Phases Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isCompleted = completedPhases.has(phase.id);
            const isAvailable = index === 0 || completedPhases.has(phases[index - 1].id);
            
            return (
              <Card 
                key={phase.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-elegant ${
                  !isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'
                }`}
                onClick={() => isAvailable && setCurrentPhase(phase.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg ${phase.color} flex items-center justify-center text-white shadow-button`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-6 h-6 text-success" />
                    )}
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    {phase.name}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardTitle>
                  <CardDescription>
                    {phase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant={isCompleted ? "default" : "secondary"}>
                      {isCompleted ? "Completada" : isAvailable ? "Disponible" : "Bloqueada"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Fase {index + 1}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};