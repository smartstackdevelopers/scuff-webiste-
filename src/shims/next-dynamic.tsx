import * as React from "react";

type DynamicOptions = {
  ssr?: boolean;
  loading?: () => React.ReactNode;
};

export default function dynamic<T extends React.ComponentType<any>>(
  loader: () => Promise<{ default: T } | T>,
  options: DynamicOptions = {}
) {
  const Lazy = React.lazy(async () => {
    const mod = await loader();
    if (mod && typeof mod === "object" && "default" in mod) {
      return mod as { default: T };
    }
    return { default: mod as T };
  });

  const DynamicComponent = (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={options.loading ? options.loading() : null}>
      <Lazy {...props} />
    </React.Suspense>
  );

  DynamicComponent.displayName = "NextDynamicShim";
  return DynamicComponent;
}
