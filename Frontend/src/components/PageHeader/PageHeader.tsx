type Props = {
    title: string;
    addLabel: string;
    onAdd: () => void;
    disabled?: boolean;
    compact?: boolean; // عنوان أصغر (للتعليقات)
  };
  
  const PageHeader = ({ title, addLabel, onAdd, disabled, compact }: Props) => {
    return (
      <div className="mb-4 flex items-center justify-between">
        <h2 className={compact ? "font-semibold" : "text-xl font-bold"}>
          {title}
        </h2>
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className="rounded bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {addLabel}
        </button>
      </div>
    );
  };
  
  export default PageHeader;