import type { ImageMetadata } from 'astro';
import dad from '../assets/images/jury-dad.jpg';
import adfest from '../assets/images/jury-adfest.jpg';
import effie from '../assets/images/jury-effie.jpg';
import talk from '../assets/images/talk-ctc2020.jpg';
import workshop from '../assets/images/workshop.jpg';
import adc from '../assets/images/adc-100.jpg';
import abby from '../assets/images/press-abby.jpg';

export interface GalleryItem {
  src: ImageMetadata;
  alt: string;
  caption: string;
}

/**
 * Original photographs supplied from ruchisharma.com. Displayed at their natural
 * aspect ratio, never cropped or stretched. Captions are taken from the text
 * printed on each image. REVIEW: confirm the Effie and ADC captions.
 */
export const juryAndStage: GalleryItem[] = [
  {
    src: dad,
    alt: 'Ruchi Sharma smiling, chin resting on her hand, on a D&AD Impact and Future Impact judge card',
    caption: 'D&AD Judge · Impact & Future Impact',
  },
  {
    src: talk,
    alt: 'Ruchi Sharma beside a fellow speaker on the Creative Talk Conference 2020 promotional card',
    caption: 'Creative Talk Conference 2020 · Bangkok',
  },
  {
    src: adfest,
    alt: 'Ruchi Sharma in black and white on an Adfest jury card for Brand Experience Lotus and Direct Lotus',
    caption: 'Adfest 2020 · 2021 · Jury',
  },
  {
    src: workshop,
    alt: 'Ruchi Sharma presenting to a seated audience at a conference session',
    caption: 'Speaking',
  },
  {
    src: effie,
    alt: 'Ruchi Sharma laughing on the Effie Pakistan 2020 jury announcement',
    caption: 'Effie Pakistan 2020 · Jury',
  },
  {
    src: adc,
    alt: 'Ruchi Sharma in black and white beside the ADC 100 Annual Awards mark',
    caption: 'ADC Annual Awards',
  },
  {
    src: abby,
    alt: 'Newspaper clipping: Phoenix Ogilvy shines bright at the ABBYs, with Ruchi Sharma holding awards',
    caption: 'Phoenix Ogilvy at the ABBYs',
  },
];
