"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/cart-context";
import { WILAYAS } from "@/lib/constants";
import { createOrder } from "@/lib/actions/orders";
import { getDeliveryFee } from "@/lib/actions/delivery-fees";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  customerEmail: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  wilaya: z.string().min(1, "Please select your wilaya"),
  address: z.string().min(10, "Please enter your full address"),
  notes: z.string().optional(),
});

export function CheckoutForm() {
  const { clearCart, items, total, deliveryFee, setDeliveryFee } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      wilaya: "",
      address: "",
      notes: "",
    },
  });

  const handleWilayaChange = async (value: string) => {
    try {
      const fee = await getDeliveryFee(value);
      setDeliveryFee(fee || 0);
      form.setValue("wilaya", value);
    } catch (error) {
      console.error("Failed to fetch delivery fee:", error);
      toast.error("Failed to fetch delivery fee");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!deliveryFee) {
      toast.error("Please select a delivery location");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        ...values,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        deliveryFee: deliveryFee,
      };

      await createOrder(orderData);
      
      toast.success(
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Order Received Successfully!</p>
          {values.customerEmail && (
            <p className="text-sm">A confirmation email will be sent to your inbox.</p>
          )}
        </div>
      );

      clearCart();
      router.push("/");
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+213 XX XX XX XX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Provide your email to receive order confirmation and updates
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wilaya"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wilaya</FormLabel>
              <Select onValueChange={handleWilayaChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your wilaya" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {WILAYAS.map((wilaya) => (
                    <SelectItem key={wilaya.code} value={wilaya.name}>
                      {wilaya.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your full delivery address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special instructions for delivery?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </Form>
  );
}