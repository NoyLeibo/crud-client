import { useEffect, useState } from "react";

interface AppAlertProps {
  text: string;
  type?: "success" | "error";
  duration?: number | null;
  undoAction?: () => void;
  onClose?: () => void;
}

export function AppAlert({
  text,
  type = "success",
  duration = 3000,
  undoAction,
  onClose,
}: AppAlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;

    const timeoutId = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [duration, onClose]);

  if (!visible) return null;

  const handleUndo = () => {
    if (undoAction) undoAction();
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <section className={`app-alert ${type}`}>
      <span>{text}</span>
      {undoAction && (
        <button onClick={handleUndo} className="undo-btn">
          Undo
        </button>
      )}
    </section>
  );
}
