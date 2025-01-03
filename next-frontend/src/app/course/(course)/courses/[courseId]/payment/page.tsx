"use client"

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PaymentPageProps {
  params: { courseId: string };
}

export default function PaymentStatusPage({ params }: PaymentPageProps) {
  const { courseId } = params;
  const searchParams = useSearchParams();
  const success = searchParams?.get('success') === '1';

  return (
    <div className="min-h-screen flex items-start gap-x justify-center bg-white">
      <div className="w-full max-w-md p-6">
        <Alert
          className={
            success
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }
        >
          {success ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <AlertTitle
            className={`text-lg ${success ? "text-green-800" : "text-red-800"}`}
          >
            {success ? "Payment Successful!" : "Payment Unsuccessful"}
          </AlertTitle>
          <AlertDescription
            className={`mt-2 ${success ? "text-green-700" : "text-red-700"}`}
          >
            {success
              ? "Your payment has been processed successfully. You can now access all chapters of the course."
              : "Your payment was not completed. Please try again."}
          </AlertDescription>
        </Alert>

        <div className="mt-8 text-center">
          <Button
            className="w-full"
            size="lg"
            onClick={() =>
              (window.location.href = `/course/courses/${courseId}`)
            }
          >
            Go back to the course
          </Button>
        </div>
      </div>
    </div>
  );
}
