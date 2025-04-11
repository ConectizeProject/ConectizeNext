"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { translateSupabaseError } from "@/utils/supabase-errors";
import { createBrowserClient } from "@supabase/ssr";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

// Schema de validação com Yup
const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
});

// Interface para os valores do formulário
interface ResetPasswordValues {
  email: string;
}

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Valores iniciais do formulário
  const initialValues: ResetPasswordValues = {
    email: "",
  };

  const handleReset = async (
    values: ResetPasswordValues,
    { setSubmitting }: FormikHelpers<ResetPasswordValues>
  ) => {
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        {
          redirectTo: `${location.origin}/auth/callback?next=/update-password`,
        }
      );

      if (error) {
        setError(translateSupabaseError(error.code));
        return;
      }

      setMessage("Verifique seu email para redefinir sua senha.");
    } catch (error) {
      setError("Ocorreu um erro ao tentar redefinir sua senha.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Recuperar senha</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Digite seu email para receber um link de recuperação
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/50">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-500 dark:bg-green-900/50">
            {message}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleReset}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting: formikSubmitting,
          }) => (
            <Form className="mt-8 space-y-6">
              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? errors.email : undefined}
                required
              />

              <div className="flex items-center justify-between">
                <Link
                  href="/signin"
                  className="text-sm text-primary hover:underline"
                >
                  Voltar para o login
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || formikSubmitting}
              >
                Enviar link de recuperação
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
