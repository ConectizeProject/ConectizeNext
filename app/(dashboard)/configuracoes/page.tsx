"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "O nome da empresa deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Digite um email válido.",
  }),
  logo: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Configuracoes() {
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        form.setValue("email", user.email || "");

        // Aqui você pode buscar mais informações da empresa no banco de dados
        // e preencher os outros campos do formulário

        // Exemplo:
        // const { data: profile } = await supabase
        //   .from('profiles')
        //   .select('company_name, logo_url')
        //   .eq('id', user.id)
        //   .single()

        // if (profile) {
        //   form.setValue('companyName', profile.company_name || '')
        //   setLogoPreview(profile.logo_url || '')
        // }
      }
    };

    getUser();
  }, [supabase.auth, form]);

  async function onSubmit(values: FormValues) {
    try {
      setIsLoading(true);
      // Aqui você implementará a lógica para salvar as alterações
      console.log(values);

      // Exemplo de como salvar os dados no Supabase:
      // const { data: { user } } = await supabase.auth.getUser()
      // if (user) {
      //   // Atualizar o email do usuário
      //   if (values.email !== user.email) {
      //     await supabase.auth.updateUser({ email: values.email })
      //   }
      //
      //   // Atualizar o perfil da empresa
      //   const { error } = await supabase
      //     .from('profiles')
      //     .update({
      //       company_name: values.companyName,
      //     })
      //     .eq('id', user.id)
      //
      //   // Fazer upload da logo se houver
      //   if (values.logo) {
      //     const fileExt = values.logo.name.split('.').pop()
      //     const fileName = `${user.id}-logo.${fileExt}`
      //
      //     const { error: uploadError } = await supabase.storage
      //       .from('logos')
      //       .upload(fileName, values.logo, { upsert: true })
      //
      //     if (!uploadError) {
      //       const { data: { publicUrl } } = supabase.storage
      //         .from('logos')
      //         .getPublicUrl(fileName)
      //
      //       await supabase
      //         .from('profiles')
      //         .update({ logo_url: publicUrl })
      //         .eq('id', user.id)
      //     }
      //   }
      // }

      toast.success("Configurações atualizadas com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar as configurações.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil do Usuário</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie as informações do seu perfil e empresa.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
          <CardDescription>
            Atualize as informações da sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormItem>
                    <FormLabel>Logo da Empresa</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={logoPreview} />
                          <AvatarFallback>Logo</AvatarFallback>
                        </Avatar>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="w-full max-w-xs"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Escolha uma imagem para a logo da sua empresa.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome da empresa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o email da empresa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar alterações"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/configuracoes/alterar-senha")}
                >
                  Alterar senha
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
