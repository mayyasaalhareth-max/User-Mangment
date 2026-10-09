type Props = {
  title: string;
  addLabel: string;
  onAdd: () => void;
  disabled?: boolean;
  compact?: boolean;
};

const PageHeader = ({
  title,
  addLabel,
  onAdd,
  disabled,
  compact,
}: Props) => {
  return (
    <div
      className={`
        flex items-center justify-between gap-4
        ${compact ? "mb-3" : "mb-6"}
      `}
    >
      <div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600" />

          <h2
            className={
              compact
                ? "font-semibold text-white"
                : "text-2xl font-bold tracking-tight text-white sm:text-3xl"
            }
          >
            {title}
          </h2>
        </div>

        {!compact && (
          <div className="ml-4 mt-2 h-px w-16 bg-cyan-400/40" />
        )}
      </div>

      <button
        type="button"
        onClick={onAdd}
        disabled={disabled}
        className="
          group flex shrink-0 items-center gap-2
          rounded-xl
          bg-gradient-to-r from-cyan-400 to-blue-500
          px-4 py-2.5
          text-sm font-semibold
          text-slate-950
          shadow-lg shadow-cyan-500/20
          transition-all duration-200
          hover:-translate-y-0.5
          hover:from-cyan-300
          hover:to-blue-400
          hover:shadow-xl hover:shadow-cyan-500/30
          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:translate-y-0
        "
      >
        <span className="text-lg leading-none transition-transform group-hover:rotate-90">
          +
        </span>

        <span>{addLabel.replace(/^＋\s*/, "").replace(/^\+\s*/, "")}</span>
      </button>
    </div>
  );
};

export default PageHeader;
