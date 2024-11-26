'use client';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const AvailablesCarousel = () => (
  <Carousel
    plugins={[Autoplay({ delay: 2000 })]}
    className="w-full max-w-screen-xl"
  >
    <CarouselContent>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index}>
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-video items-center justify-center p-6">
                <div
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={`/images/${index + 1}.jpg`}
                    width={960}
                    height={540}
                    layout="intrintsic"
                    alt="Header"
                    className="w-full object-cover rounded-t-md"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);
