interface AppHeaderProps {
  onAddProduct: () => void;
  onDeleteProduct: () => void;
}

export function AppHeader({ onDeleteProduct, onAddProduct }: AppHeaderProps) {
  return (
    <header className="flex space-between align-center">
      <h1>
        Crud <strong>Application</strong>
      </h1>
      <div className="header-actions">
        <button className="btn delete" onClick={() => onDeleteProduct()}>
          ❌ Delete
        </button>
        <button className="btn add" onClick={() => onAddProduct()}>
          ➕ Add New
        </button>
      </div>
    </header>
  );
}
