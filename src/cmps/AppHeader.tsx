import { useState } from "react";
import { YesOrNoModal } from "./yesOrNoModal";
import type { IProductModel, SetState } from "../models/types";

interface AppHeaderProps {
  onAddProduct: () => void;
  onDeleteProducts: () => void;
  selectedIds: string[];
  yesOrNoModal: boolean;
  setYesOrNoModal: SetState<boolean>;
}

export function AppHeader({
  onDeleteProducts,
  onAddProduct,
  selectedIds,
  yesOrNoModal,
  setYesOrNoModal,
}: AppHeaderProps) {
  const hasSelected = selectedIds.length > 0;

  return (
    <header className="flex space-between align-center">
      <h1>
        Crud <strong>Application</strong>
      </h1>
      <div className="header-actions">
        <button
          disabled={!hasSelected}
          className={`btn delete ${!hasSelected ? "no-drop unset-hover" : ""}`}
          onClick={() => setYesOrNoModal(true)}
        >
          ❌ Delete
        </button>
        <button className="btn add" onClick={() => onAddProduct()}>
          ➕ Add New
        </button>
      </div>
      {yesOrNoModal && (
        <YesOrNoModal
          handleYes={() => onDeleteProducts()}
          handleNo={() => setYesOrNoModal(false)}
          title={`Delete ${selectedIds.length} products`}
          text="Are you sure?"
        />
      )}
    </header>
  );
}
