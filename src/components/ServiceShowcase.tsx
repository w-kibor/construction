import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "./ui/button";

interface Media {
  src: string;
  type: "image" | "video";
  alt: string;
}

interface ServiceShowcaseProps {
  title: string;
  description: string;
  medias: Media[];
  features: string[];
}

export function ServiceShowcase({
  title,
  description,
  medias,
  features,
}: ServiceShowcaseProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showVideoPlay, setShowVideoPlay] = useState(false);

  const currentMedia = medias[currentMediaIndex];

  const handlePrevious = () => {
    setCurrentMediaIndex((prev: number) => (prev === 0 ? medias.length - 1 : prev - 1));
    setShowVideoPlay(false);
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev: number) => (prev === medias.length - 1 ? 0 : prev + 1));
    setShowVideoPlay(false);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Media Carousel */}
          <div className="flex flex-col gap-4">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video group carousel-container">
              {currentMedia.type === "image" ? (
                <img
                  src={currentMedia.src}
                  alt={currentMedia.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <>
                  <video
                    src={currentMedia.src}
                    className="w-full h-full object-cover"
                    controls={showVideoPlay}
                    preload="metadata"
                  />
                  {!showVideoPlay && (
                    <button
                      onClick={() => setShowVideoPlay(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
                    >
                      <Play className="w-16 h-16 text-white fill-white" />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Navigation */}
            {medias.length > 1 && (
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currentMediaIndex + 1} / {medias.length}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  className="rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Thumbnail indicators */}
            {medias.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {medias.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentMediaIndex(idx);
                      setShowVideoPlay(false);
                    }}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all thumbnail-item ${
                      idx === currentMediaIndex
                        ? "border-blue-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                  {media.type === "image" ? (
                      <img
                        src={media.src}
                        alt={media.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {description}
              </p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-200">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
