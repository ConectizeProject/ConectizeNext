import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AssinaturaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Assinatura</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie sua assinatura e plano.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Assinatura</CardTitle>
          <CardDescription>Informações sobre seu plano atual</CardDescription>
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
