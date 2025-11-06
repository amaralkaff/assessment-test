interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  return (
    <div className="alert alert-error">
      <span>{message}</span>
    </div>
  );
}
