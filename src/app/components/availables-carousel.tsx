'use client';

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
                <img
                  src="https://via.placeholder.com/960x540"
                  alt="Header"
                  className="w-full object-cover rounded-t-md"
                />
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
