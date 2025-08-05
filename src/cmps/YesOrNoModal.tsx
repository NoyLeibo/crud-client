interface YesOrNoModalProps {
  handleYes: () => void;
  handleNo?: () => void;
  title: string;
  text: string;
  yesButtonText?: string;
}

export function YesOrNoModal({
  handleYes,
  handleNo,
  title,
  text,
  yesButtonText = "Yes",
}: YesOrNoModalProps) {
  return (
    <div className="yes-no-modal-container flex align-center justify-center">
      <div className="yes-no-modal flex column width100percent">
        <h1>{title}</h1>
        <h3>{text}</h3>
        <div className="yes-no-buttons-container flex">
          {handleNo && <button className="cancel-btn cursor" onClick={handleNo}>
            Cancel
          </button>}
          <button className="leave-page-btn cursor" onClick={handleYes}>
            {yesButtonText ? yesButtonText : "Yes"}
          </button>
        </div>
      </div>
      <div className="modal-background" onClick={handleNo}></div>
    </div>
  );
}
