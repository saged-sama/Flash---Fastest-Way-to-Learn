// "use client";

// import { Button } from "@/components/ui/button";
// import { Brain } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { FloatingSummary } from "./floating-summary";

// interface SummarizeButtonProps {
//   summary: string
// }

// export const SummarizeButton = ({
//   summary
// }: SummarizeButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSummary, setShowSummary] = useState(false);

//   console.log("Summary: ", summary)

//   const handleClick = async () => {
//     try {
//       setIsLoading(true);
//       setShowSummary(true);
//       toast.success("Summary generated successfully!");
//     } catch (error) {
//       console.error("Error summarizing the video:", error);
//       toast.error("Failed to generate summary. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const Icon = Brain;

//   return (
//     <div>
//       <Button
//         type="button"
//         onClick={handleClick}
//         disabled={isLoading}
//         size="sm"
//         className="w-full md:w-auto"
//       >
//         {isLoading ? "Summarizing..." : "Summarize"}
//         <Icon className="h-4 w-4 ml-2" />
//       </Button>

//       {showSummary && (
//         <FloatingSummary
//           summary={summary!}
//           onClose={() => setShowSummary(false)}
//         />
//       )}
//     </div>
//   );
// };

import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FloatingSummary } from "./floating-summary";

interface SummarizeButtonProps {
  summary: string | null; // Accepts null as a possible value
}

export const SummarizeButton = ({
  summary
}: SummarizeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  console.log("Summary: ", summary);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setShowSummary(true);
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error("Error summarizing the video:", error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = Brain;

  return (
    <div>
      <Button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        size="sm"
        className="w-full md:w-auto"
      >
        {isLoading ? "Summarizing..." : "Summarize"}
        <Icon className="h-4 w-4 ml-2" />
      </Button>

      {showSummary && summary !== null && (
        <FloatingSummary
          summary={summary}
          onClose={() => setShowSummary(false)}
        />
      )}
    </div>
  );
};
