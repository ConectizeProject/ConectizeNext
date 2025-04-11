"use client";

import { ImageUpload } from "@/components/image-upload";
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
  email: z.string().email({
    message: "Digite um email válido.",
  }),
  full_name: z.string().optional(),
  company_name: z.string().min(2, {
    message: "O nome da empresa deve ter pelo menos 2 caracteres.",
  }),
  avatar_url: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Configuracoes() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      full_name: "",
      company_name: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        form.setValue("email", user.email || "");

        // Buscar informações do usuário
        const { data: userData } = await supabase
          .from("users")
          .select("full_name, company_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (userData) {
          form.setValue("full_name", userData.full_name || "");
          form.setValue("company_name", userData.company_name || "");
          form.setValue("avatar_url", userData.avatar_url || "");
        }
      }
    };

    getUser();
  }, [supabase.auth, form]);

  async function onSubmit(values: FormValues) {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      // Atualizar o email do usuário se mudou
      if (values.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: values.email,
        });
        if (emailError) throw emailError;
      }

      // Atualizar informações do usuário
      const { error: updateError } = await supabase
        .from("users")
        .update({
          full_name: values.full_name,
          company_name: values.company_name,
          avatar_url: values.avatar_url,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast.success("Configurações atualizadas com sucesso!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar as configurações.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      // Buscar o avatar atual do usuário
      const { data: userData } = await supabase
        .from("users")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      // Se existir um avatar anterior, deletar
      if (userData?.avatar_url) {
        const oldFilePath = userData.avatar_url.split("/").pop();
        if (oldFilePath) {
          await supabase.storage.from("avatars").remove([oldFilePath]);
        }
      }

      // Upload da nova imagem
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      // Atualizar a URL do avatar na tabela users
      const { error: updateError } = await supabase
        .from("users")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast.success("Foto de perfil atualizada com sucesso!");
      return publicUrl;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      toast.error("Erro ao fazer upload da imagem");
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil do Usuário</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie suas informações pessoais.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>Atualize suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto de Perfil</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        onUpload={handleImageUpload}
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
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome completo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome da sua empresa"
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
