import { useEffect } from 'react';

import type { SubmissionResult } from '@conform-to/react';

type FormSubmittedToastProps = {
  lastResult?: SubmissionResult<string[]> | null;
  onSuccess?: () => void;
  onError?: (errorMessage?: string) => void;
};

const FormSubmittedToast = ({
  lastResult,
  onSuccess,
  onError,
}: FormSubmittedToastProps) => {
  useEffect(() => {
    if (!lastResult) return;
    if (lastResult.status === 'success' && onSuccess) {
      onSuccess();
    }
    if (lastResult.status === 'error' && onError) {
      const errorMessages = lastResult.error && lastResult.error[''];
      onError(errorMessages ? errorMessages[0] : undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastResult]);

  return null;
};

export { FormSubmittedToast };
