
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { analyzeBillImage, BillData } from '@/services/openai';
import { useGamification } from '@/context/GamificationContext';

interface UploadBillButtonProps {
  className?: string;
  variant?: "default" | "outline" | "apple";
  children?: React.ReactNode;
  size?: "default" | "lg" | "sm" | "xl";
}

const UploadBillButton: React.FC<UploadBillButtonProps> = ({
  className,
  variant = "default",
  children,
  size = "default"
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { addXP, incrementBillsAnalyzed } = useGamification();

  const handleButtonClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsUploading(true);

      toast({
        title: "🚀 Analyzing your bill...",
        description: "Our AI is reading and extracting data from your bill!",
        duration: 5000,
      });

      try {
        // Convert file to base64
        const base64 = await fileToBase64(file);

        // Analyze the bill with GPT-4 Vision
        const billData = await analyzeBillImage(base64);

        // Store the bill data for the dashboard
        sessionStorage.setItem('billData', JSON.stringify(billData));
        sessionStorage.setItem('billImage', base64);

        // Award XP
        addXP(25, 'Uploaded and analyzed a bill');
        incrementBillsAnalyzed();

        toast({
          title: "✨ +25 XP Earned!",
          description: billData.totalAmount
            ? `Bill analyzed! Total: $${billData.totalAmount.toFixed(2)}`
            : "Your bill has been successfully analyzed.",
          duration: 4000,
        });

        setIsUploading(false);
        navigate('/bill-analysis');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to analyze bill';

        toast({
          title: "Analysis Failed",
          description: errorMessage.includes('API key')
            ? "Please add your OpenAI API key to the .env file."
            : errorMessage,
          variant: "destructive",
          duration: 5000,
        });

        setIsUploading(false);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: 'none' }}
      />

      <Button
        onClick={handleButtonClick}
        variant={variant === "apple" ? "apple" : variant}
        size={size}
        className={cn(
          "relative overflow-hidden group",
          isUploading && "opacity-90 cursor-wait",
          className
        )}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" strokeWidth={1.5} />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" strokeWidth={1.5} />
            <span>{children || "Upload Bill"}</span>
            {/* Subtle shine effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
          </>
        )}
      </Button>
    </>
  );
};

export default UploadBillButton;
