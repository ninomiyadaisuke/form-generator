import Link from 'next/link';
import React from 'react';
import Confetti from 'react-confetti';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const FormPublished = ({ shareURL, id }: { shareURL: string; id: number }) => {
  const shareUrl = `${window.location.origin}/submit/${shareURL}`;

  return (
    <>
      <Confetti height={window.innerHeight} numberOfPieces={1000} recycle={false} width={window.innerWidth} />
      <div className="flex size-full flex-col items-center justify-center">
        <div className="max-w-md">
          <h1 className="mb-10 border-b pb-2 text-center text-4xl font-bold text-primary">🎊🎊 Form Published 🎊🎊</h1>
          <h2 className="text-2xl">Share this form</h2>
          <h3 className="border-b pb-10 text-xl text-muted-foreground">
            Anyone with the link can view and submit the form
          </h3>
          <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
            <Input className="w-full" readOnly value={shareUrl} />
            <Button
              className="mt-2 w-full"
              onClick={() => {
                void navigator.clipboard.writeText(shareUrl);
                toast({
                  title: 'Copied!',
                  description: 'Link copied to clipboard',
                });
              }}
            >
              Copy link
            </Button>
          </div>
          <div className="flex justify-between">
            <Button asChild variant={'link'}>
              <Link className="gap-2" href={'/'}>
                <BsArrowLeft />
                Go back home
              </Link>
            </Button>
            <Button asChild variant={'link'}>
              <Link className="gap-2" href={`/forms/${id}`}>
                Form details
                <BsArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPublished;
