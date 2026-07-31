import { cn } from "@/lib/utils";

type SolutionsProjectTagsProps = {
  tags: string[];
  className?: string;
};

const tagClassName =
  "rounded-full border border-[var(--lg-border)] bg-[var(--lg-fill)] px-3.5 py-1.5 text-xs font-medium text-dhakaa-600 backdrop-blur-[var(--lg-blur)]";

export function SolutionsProjectTags({
  tags,
  className,
}: SolutionsProjectTagsProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Project tags"
    >
      {tags.map((tag) => (
        <span key={tag} className={tagClassName}>
          {tag}
        </span>
      ))}
    </div>
  );
}
