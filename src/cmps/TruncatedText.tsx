import { useState } from "react";
import { YesOrNoModal } from "./yesOrNoModal";

interface Props {
  text: string;
  title: string;
}

export function TruncatedText({ text, title }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = text.length > 20;

  return (
    <div>
      <span>
        {!shouldTruncate ? (
          <span>{text}</span>
        ) : (
          <span>
            {text.slice(0, 20)}...
            <span className="read-more" onClick={() => setIsExpanded(true)}>
              Read more
            </span>
          </span>
        )}
        {isExpanded && (
          <div>
            <YesOrNoModal
              text={text}
              title={title}
              handleYes={() => setIsExpanded(false)}
              yesButtonText="Close"
            />
          </div>
        )}
      </span>
    </div>
  );
}
