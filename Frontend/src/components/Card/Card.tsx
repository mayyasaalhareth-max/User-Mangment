import type { ReactNode } from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: "green" | "gray" | "red";
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

const badgeStyles = {
  green: "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20",
  gray: "bg-slate-700/50 text-slate-300 border border-slate-600/30",
  red: "bg-red-400/10 text-red-400 border border-red-400/20",
};

const Card = ({
  title,
  subtitle,
  badge,
  badgeColor = "gray",
  children,
  footer,
  className = "",
}: CardProps) => {
  return (
    <article
      className={`
        
        group mb-3 overflow-hidden
        rounded-3xl
        border border-slate-700/80
        bg-slate-900
        p-5
        shadow-lg shadow-black/10
        transition-all duration-300
        hover:-translate-y-1
        hover:border-cyan-400/40
        hover:shadow-xl hover:shadow-cyan-500/5
        ${className}
      `}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white transition-colors group-hover:text-cyan-300">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {badge && (
          <span
            className={`
              shrink-0 rounded-full
              px-3 py-1
              text-xs font-semibold
              ${badgeStyles[badgeColor]}
            `}
          >
            {badge}
          </span>
        )}
      </header>

      {children && (
        <div className="mt-4 text-sm leading-6 text-slate-300">
          {children}
        </div>
      )}

      {footer && (
        <footer className="mt-5 border-t border-slate-800 pt-4 text-sm">
          {footer}
        </footer>
      )}
    </article>
  );
};

export default Card;
