"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "../schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface CreateWorkspaceProps {
  onCancel?: () => void;
}

export const CreateWorkspace = ({ onCancel }: CreateWorkspaceProps) => {
  const { mutate, isPending } = useCreateWorkspace();
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate({
      json: data,
    });
  });

  return (
    <Card className="p-7">
      <CardHeader>
        <CardTitle>Create Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <Form {...form}>
          <form onSubmit={onSubmit} aria-disabled={isPending}>
            <FormLabel htmlFor="name" className="mb-2">
              Workspace Name
            </FormLabel>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="Enter your workspace name"
                      className="mt-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-8" />

            <div className="flex justify-between">
              <Button variant="secondary">Cancel</Button>
              <Button disabled={isPending}>Create Workspace</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
