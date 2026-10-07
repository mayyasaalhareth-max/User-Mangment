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
  green: "bg-emerald-100 text-emerald-700",
  gray: "bg-gray-100 text-gray-600",
  red: "bg-red-100 text-red-700",
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
      className={`mb-3 rounded-lg border border-gray-200 bg-white p-4 shadow-xs ${className}`}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>

        {badge && (
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${badgeStyles[badgeColor]}`}
          >
            {badge}
          </span>
        )}
      </header>

      {children && <div className="mt-2 text-gray-700">{children}</div>}

      {footer && (
        <footer className="mt-3 border-t border-gray-100 pt-2 text-sm">
          {footer}
        </footer>
      )}
    </article>
  );
};

export default Card;
