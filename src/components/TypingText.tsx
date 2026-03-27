import { useEffect, useState } from 'react';

interface TypingTextProps {
  lines: string[];
  speed?: number;
  className?: string;
  loop?: boolean;
  pauseMs?: number;
}

export function TypingText({
  lines,
  speed = 40,
  className = '',
  loop = true,
  pauseMs = 2000,
}: TypingTextProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const currentLine = lines[lineIndex];

    if (!isDeleting && charIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayed(currentLine.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && charIndex > currentLine.length) {
      if (!loop && lineIndex === lines.length - 1) return;
      const timeout = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayed(currentLine.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, speed / 2);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setLineIndex((i) => (i + 1) % lines.length);
    }
  }, [charIndex, isDeleting, lineIndex, lines, loop, pauseMs, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="cursor-blink">|</span>
    </span>
  );
}
