import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PlanosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Planos</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie os planos disponíveis no sistema.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Planos</CardTitle>
          <CardDescription>
            Gerencie os planos disponíveis para assinatura
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
