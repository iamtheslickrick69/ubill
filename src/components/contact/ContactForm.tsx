
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
});

type ContactFormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(''); // For demonstration - in production, this should be an environment variable

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // For demonstration - in a real app, you'd use an environment variable for the webhook URL
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify(data),
        });
      } else {
        // If no webhook URL, just log the data (this is for demonstration purposes)
        console.log('Form data submitted:', data);
      }
      
      toast({
        title: "Success!",
        description: "Thanks! We've received your info.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // This is just for demonstration purposes - in a real app, you'd set the webhook URL as an environment variable
  const handleWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="hidden">
          <FormLabel htmlFor="webhook-url">Webhook URL (for demo purposes only)</FormLabel>
          <Input 
            id="webhook-url"
            value={webhookUrl} 
            onChange={handleWebhookChange} 
            placeholder="Paste your Zapier/n8n webhook URL here"
            className="mb-4"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} className="transition-all focus:ring-2 focus:ring-energy-blue" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} className="transition-all focus:ring-2 focus:ring-energy-blue" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" type="email" {...field} className="transition-all focus:ring-2 focus:ring-energy-blue" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} className="transition-all focus:ring-2 focus:ring-energy-blue" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Address</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="123 Main St, Anytown, CA 12345" 
                  {...field} 
                  className="min-h-[100px] transition-all focus:ring-2 focus:ring-energy-blue" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-center mt-6">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="bg-energy-blue hover:bg-energy-blue/90 transition-all px-8 py-6"
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <span className="flex items-center gap-2">
                Submit <Send className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
