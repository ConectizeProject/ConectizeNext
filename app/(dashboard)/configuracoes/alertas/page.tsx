import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AlertasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Alertas</h3>
        <p className="text-sm text-muted-foreground">
          Configure os alertas do sistema.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Alertas</CardTitle>
          <CardDescription>
            Gerencie como e quando os alertas são enviados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Esta seção está em desenvolvimento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
