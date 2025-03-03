import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Usuários</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie os usuários do sistema.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>
            Gerencie os usuários que têm acesso ao sistema
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
