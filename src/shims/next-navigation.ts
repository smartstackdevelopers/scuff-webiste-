import {
  useNavigate,
  useLocation,
  useParams as useRRParams,
  useSearchParams as useRRSearchParams,
} from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => navigate(0),
    prefetch: async (_href: string) => undefined,
    pathname: location.pathname,
    query: Object.fromEntries(new URLSearchParams(location.search)),
    asPath: `${location.pathname}${location.search}${location.hash}`,
  };
}

export function usePathname() {
  return useLocation().pathname;
}

export function useSearchParams() {
  const [params] = useRRSearchParams();
  return params;
}

export function useParams<
  T extends Record<string, string | undefined> = Record<string, string>,
>() {
  return useRRParams() as T;
}

export function notFound(): never {
  if (typeof window !== "undefined") {
    window.location.assign("/404");
  }
  throw new Error("NEXT_NOT_FOUND");
}

export function redirect(url: string): never {
  if (typeof window !== "undefined") {
    window.location.assign(url);
  }
  throw new Error(`NEXT_REDIRECT:${url}`);
}
