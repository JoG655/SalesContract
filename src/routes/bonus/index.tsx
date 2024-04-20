import { createFileRoute } from "@tanstack/react-router";
import { Button, type ButtonProps } from "../../components/Button";
import { Spinner, type SpinnerProps } from "../../components/Spinner";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/bonus/")({
  component: Bonus,
});

const spinnerTexts: string[] = ["", "Loading..."];
const spinnerAnimationCounts: SpinnerProps["animationCount"][] = [
  1, 2, 3, 4, 5,
];

const buttonVariants: ButtonProps["variant"][] = [
  "primary",
  "outline",
  "ghost",
];
const buttonSizes: ButtonProps["size"][] = ["sm", "md", "lg", "xl"];

export function Bonus() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl animate-fadeIn flex-col scroll-smooth">
      <div className="grid flex-grow grid-cols-[auto,minmax(0,1fr)] overflow-auto">
        <div className="text-center">
          <div className="relative z-0 grid place-content-center overflow-hidden p-6 lg:p-8">
            <div className="mx-auto">
              <div className="mt-8 grid place-items-center gap-12">
                {spinnerTexts.map((spinnerText) => (
                  <div
                    className="flex items-center justify-center gap-6"
                    key={spinnerText}
                  >
                    <div className="grid gap-2">
                      <h2 className="text-xl font-bold uppercase tracking-wide">
                        {spinnerText} Spinner
                      </h2>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {spinnerAnimationCounts.map((spinnerAnimationCount) => (
                          <Spinner
                            animationCount={spinnerAnimationCount}
                            key={spinnerAnimationCount}
                          >
                            {spinnerText ? spinnerText : null}
                          </Spinner>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {buttonVariants.map((buttonVariant) => (
                  <div
                    className="flex items-center justify-center gap-6"
                    key={buttonVariant}
                  >
                    <div className="grid gap-2">
                      <h2 className="text-xl font-bold uppercase tracking-wide">
                        {buttonVariant} Buttons
                      </h2>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {buttonSizes.map((buttonSize, index) => (
                          <Button
                            variant={buttonVariant}
                            size={buttonSize}
                            disabled={index === buttonSizes.length - 1}
                            key={buttonSize}
                          >
                            <span>Learn More</span>
                            <span>&rarr;</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <h2 className="text-xl font-bold uppercase tracking-wide">
                        {buttonVariant} Icon
                      </h2>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {buttonSizes.map((buttonSize, index) => (
                          <Button
                            variant={buttonVariant}
                            size={buttonSize}
                            btnType="icon"
                            disabled={index === buttonSizes.length - 1}
                            key={buttonSize}
                          >
                            <Plus />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
