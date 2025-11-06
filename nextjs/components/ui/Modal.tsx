import { ReactNode } from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  confirmText?: string;
  confirmVariant?: 'primary' | 'error';
  onConfirm?: () => void;
  loading?: boolean;
  error?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmText = 'Confirm',
  confirmVariant = 'primary',
  onConfirm,
  loading = false,
  error,
}: ModalProps) {
  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={isOpen}
        onChange={() => {}}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{children}</div>

          {error && (
            <div className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="modal-action">
            <Button variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            {onConfirm && (
              <Button
                variant={confirmVariant}
                onClick={onConfirm}
                loading={loading}
              >
                {loading ? 'Processing...' : confirmText}
              </Button>
            )}
          </div>
        </div>
        <label
          className="modal-backdrop"
          onClick={() => !loading && onClose()}
        >
          Close
        </label>
      </div>
    </>
  );
}
