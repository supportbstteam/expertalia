'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

export default function ToastComponent({ error, success }) {
  const hasShown = useRef(false);

  useEffect(() => {
    if (hasShown.current) return;

    if (error) {
      toast.error(error);
      hasShown.current = true;
    } else if (success) {
      toast.success(success);
      hasShown.current = true;
    }
  }, [error, success]);

  return null;
}
