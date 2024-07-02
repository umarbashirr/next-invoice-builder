"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef } from "react";
import { createClient } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const clientFormSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  isShippingSameAsBilling: z.boolean().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zip: z.string().optional(),
  }),
  shippingAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zip: z.string().optional(),
  }),
});

const ClientForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
      isShippingSameAsBilling: false,
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
    },
  });
  const prevIsShippingSameAsBillingRef = useRef(
    form.getValues("isShippingSameAsBilling")
  );

  const onSubmit = async (values: z.infer<typeof clientFormSchema>) => {
    try {
      const response = await createClient(values);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log(response.data);
      toast({
        title: "Success",
        description: "Client created successfully",
      });
      router.refresh();
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "isShippingSameAsBilling") {
        const prevIsShippingSameAsBilling =
          prevIsShippingSameAsBillingRef.current;
        const currentIsShippingSameAsBilling = value.isShippingSameAsBilling;

        if (prevIsShippingSameAsBilling !== currentIsShippingSameAsBilling) {
          prevIsShippingSameAsBillingRef.current =
            currentIsShippingSameAsBilling;

          if (currentIsShippingSameAsBilling) {
            // Copy billing address to shipping address when checked
            form.setValue("shippingAddress", value.address || {}, {
              shouldValidate: false,
              shouldDirty: false,
            });
          } else {
            // Clear shipping address when unchecked
            form.setValue(
              "shippingAddress",
              {
                street: "",
                city: "",
                state: "",
                country: "",
                zip: "",
              },
              { shouldValidate: false, shouldDirty: false }
            );
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-solid border-gray-300 p-3">
            <legend>Personal Details</legend>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-solid border-gray-300 p-3">
            <legend>Billing Address</legend>
            <FormField
              name="address.street"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.state"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.zip"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div>
            <FormField
              name="isShippingSameAsBilling"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Same as Billing Address</FormLabel>
                </FormItem>
              )}
            />
          </div>
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-solid border-gray-300 p-3">
            <legend>Shipping Address</legend>
            <FormField
              name="shippingAddress.street"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="shippingAddress.city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="shippingAddress.state"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="shippingAddress.country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="shippingAddress.zip"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div className="flex items-center justify-end gap-4">
            <Button>Create now</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClientForm;
