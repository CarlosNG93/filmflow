import { useRouter } from "next/router";
import React from "react";

interface BreadcrumbProps {
  paths?: { name: string; link: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  const router = useRouter();

  // Si no se proporcionan rutas explícitas, podríamos inferir algo basado en la ruta actual.
  // Este es solo un ejemplo básico y deberías ajustarlo según tus necesidades.
  if (!paths) {
    paths = router.pathname
      .split("/")
      .filter(Boolean)
      .map((segment, index, array) => {
        return {
          name: segment,
          link: `/${array.slice(0, index + 1).join("/")}`,
        };
      });
  }

  return (
    <div>
      {paths.map((path, index) => (
        <span key={index}>
          {index > 0 && " > "}
          <a
            href={path.link}
            onClick={(e) => {
              e.preventDefault();
              router.push(path.link);
            }}
          >
            {path.name}
          </a>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
