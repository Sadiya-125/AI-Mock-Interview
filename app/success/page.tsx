import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <section className="max-w-lg w-full mx-auto px-4">
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-4xl font-bold">🎉 Payment Successful!</h2>
          <p className="text-lg text-muted-foreground">
            Thank you for upgrading to PrepWise Premium. You now have access to all premium features.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold text-green-700 dark:text-green-400">What's Next?</h3>
              <ul className="mt-2 space-y-2 text-muted-foreground">
                <li>Start unlimited practice interviews</li>
                <li>Get detailed feedback on your performance</li>
                <li>Access priority support when needed</li>
              </ul>
            </div>

            <Button asChild className="w-full">
              <Link href="/">Start Your First Premium Interview</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}