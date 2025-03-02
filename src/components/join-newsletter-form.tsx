"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export function JoinNewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/email/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        switch (response.status) {
          case 409:
            toast.error("You are already subscribed to our newsletter.");
            break;
          case 422:
            toast.error("Invalid input.");
            break;
          case 429:
            toast.error("The daily email limit has been reached.");
            break;
          default:
            toast.error("An unknown error occurred. Please try again later.");
        }
        return;
      }

      toast.success("You have been subscribed to our newsletter.");
      form.reset();
    } catch (err) {
      console.log(err);
      toast.error("An unknown error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4 pt-6">
      <div>
        <p>
          I run a newsletter about design, coding, developer life and open
          source.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="m@example.com"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline" disabled={isLoading}>
            Subscribe
          </Button>
        </form>
      </Form>
    </div>
  );
}
