"use client";

export function BackgroundMesh() {
  return (
    <div className="mesh-bg pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1vcGFjaXR5PSIwLjAzIiBzdHJva2U9IiNmOWZhZjciPjxwYXRoIGQ9Ik0wIDMwaDMwTTMwIDBoMzBNMzAgMzBoMzBNMCAwSDM2Ii8+PC9nPjwvc3ZnPg==')] opacity-40" />
    </div>
  );
}
